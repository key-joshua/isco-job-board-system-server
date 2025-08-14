import StatusCodes from 'http-status-codes';
import responseUtils from '../../../utils/responseUtils';
import applicantsRepository from '../repository/applicantsRepository';

const createApplicant = async (req, res) => {
  try {
    req.body.user_id = req.user.id;
    const applicant = await applicantsRepository.createApplicant(req.body);
    responseUtils.handleSuccess(StatusCodes.CREATED, 'Applicant created successfully.', applicant);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

const getApplicants = async (req, res) => {
  try {
    const applicants = await applicantsRepository.findAllApplicants(req.query);

    if (!applicants || applicants.length === 0) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Applicants not found.');
      return responseUtils.response(res);
    }

    responseUtils.handleSuccess(StatusCodes.OK, 'Applicants fetched successfully.', applicants);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

const getApplicant = async (req, res) => {
  try {
    const applicant = await applicantsRepository.findApplicantById(req.params.id);
    if (!applicant) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Applicant not found');
      return responseUtils.response(res);
    }

    responseUtils.handleSuccess(StatusCodes.OK, 'Applicant fetched successfully.', applicant);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

const updateApplicant = async (req, res) => {
  try {
    const applicant = await applicantsRepository.findApplicantById(req.params.id);
    if (!applicant) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Applicant not found for update');
      return responseUtils.response(res);
    }

    const updatedApplicant = await applicantsRepository.updateApplicantById(req.params.id, req.body);
    if (!updatedApplicant) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Applicant not found for update');
      return responseUtils.response(res);
    }

    responseUtils.handleSuccess(StatusCodes.OK, 'Applicant updated successfully.', updatedApplicant);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

const deleteApplicant = async (req, res) => {
  try {
    const applicant = await applicantsRepository.findApplicantById(req.params.id);
    if (!applicant) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Job not found for deletion');
      return responseUtils.response(res);
    }

    const deletedApplicant = await applicantsRepository.deleteApplicantById(req.params.id);
    if (!deletedApplicant) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Job not found for deletion');
      return responseUtils.response(res);
    }

    responseUtils.handleSuccess(StatusCodes.OK, 'Job deleted successfully.', deletedApplicant);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

export default {
  createApplicant,
  getApplicants,
  getApplicant,
  updateApplicant,
  deleteApplicant
};
