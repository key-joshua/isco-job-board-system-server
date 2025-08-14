import dotenv from 'dotenv';
import { v2 } from 'cloudinary';
import StatusCodes from 'http-status-codes';
import responseUtils from '../utils/responseUtils';

dotenv.config();

v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

const uploadService = async (req, res, next) => {
  const profilePicture = req?.files?.profile_picture;
  const coverLetter = req?.files?.cover_letter;
  const attachments = req?.files?.attachments;
  const attachment = req?.files?.attachment;
  const resume = req?.files?.resume;

  // === Handle Single File ===
  if (profilePicture) {
    const filename = profilePicture.originalFilename || '';
    const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
    const allowedSingleExtensions = ['.jpg', '.png', '.pdf', '.doc', '.docx'];

    if (!allowedSingleExtensions.includes(extension)) {
      responseUtils.handleError( StatusCodes.BAD_REQUEST, 'Invalid file type. Accepted types for file: .jpg, .png' );
      return responseUtils.response(res);
    }

    try {
      const result = await v2.uploader.upload(profilePicture.path);
      req.body.profile_picture = result?.url;
    } catch (error) {
      responseUtils.handleError( StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to upload file. Please try again.' );
      return responseUtils.response(res);
    }
  }

  if (coverLetter) {
    const filename = coverLetter.originalFilename || '';
    const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
    const allowedSingleExtensions = ['.jpg', '.png', '.pdf', '.doc', '.docx'];

    if (!allowedSingleExtensions.includes(extension)) {
      responseUtils.handleError( StatusCodes.BAD_REQUEST, 'Invalid file type. Accepted types for file: .jpg, .png' );
      return responseUtils.response(res);
    }

    try {
      const result = await v2.uploader.upload(coverLetter.path);
      req.body.cover_letter = result?.url;
    } catch (error) {
      responseUtils.handleError( StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to upload file. Please try again.' );
      return responseUtils.response(res);
    }
  }

  if (resume) {
    const filename = resume.originalFilename || '';
    const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
    const allowedSingleExtensions = ['.jpg', '.png', '.pdf', '.doc', '.docx'];

    if (!allowedSingleExtensions.includes(extension)) {
      responseUtils.handleError( StatusCodes.BAD_REQUEST, 'Invalid file type. Accepted types for file: .jpg, .png' );
      return responseUtils.response(res);
    }

    try {
      const result = await v2.uploader.upload(resume.path);
      req.body.resume = result?.url;
    } catch (error) {
      responseUtils.handleError( StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to upload file. Please try again.' );
      return responseUtils.response(res);
    }
  }

  if (attachment) {
    const filename = attachment.originalFilename || '';
    const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
    const allowedSingleExtensions = ['.jpg', '.png', '.pdf', '.doc', '.docx'];

    if (!allowedSingleExtensions.includes(extension)) {
      responseUtils.handleError( StatusCodes.BAD_REQUEST, 'Invalid file type. Accepted types for file: .jpg, .png' );
      return responseUtils.response(res);
    }

    try {
      const result = await v2.uploader.upload(attachment.path);
      req.body.attachment = result?.url;
    } catch (error) {
      responseUtils.handleError( StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to upload file. Please try again.' );
      return responseUtils.response(res);
    }
  }

  // === Handle Multiple Files ===
  if (attachments && (Array.isArray(attachments) ? attachments.length > 0 : true)) {
    const documentsArray = Array.isArray(attachments) ? attachments : [attachments];
    const allowedMultiExtensions = ['.jpg', '.png', '.pdf', '.doc', '.docx'];
    const uploadedUrls: string[] = [];

    for (const file of documentsArray) {
      const filename = file.originalFilename || '';
      const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();

      if (!allowedMultiExtensions.includes(extension)) {
        responseUtils.handleError(
          StatusCodes.BAD_REQUEST,
          'Invalid document type. Accepted types: .pdf, .doc, .docx'
        );
        return responseUtils.response(res);
      }

      try {
        const result = await v2.uploader.upload(file.path, {
          resource_type: 'raw',
        });
        uploadedUrls.push(result?.url);
      } catch (error) {
        responseUtils.handleError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'Failed to upload document. Please try again.'
        );
        return responseUtils.response(res);
      }
    }

    req.body.attachments = uploadedUrls;
  }

  return next();
};

export { uploadService };
