import StatusCodes from 'http-status-codes';
import responseUtils from '../../../utils/responseUtils';
import jobRepository from '../repository/jobsRepository';

const createJob = async (req, res) => {
  try {
    const job = await jobRepository.createJob(req.body);

    responseUtils.handleSuccess(StatusCodes.CREATED, 'Job created successfully.', job);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await jobRepository.findAllJobs(req.query);

    if (!jobs || jobs.length === 0) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Jobs not found.');
      return responseUtils.response(res);
    }

    responseUtils.handleSuccess(StatusCodes.OK, 'Jobs fetched successfully.', jobs);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

const getJob = async (req, res) => {
  try {
    const job = await jobRepository.findJobById(req.params.id);
    if (!job) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Job not found');
      return responseUtils.response(res);
    }

    responseUtils.handleSuccess(StatusCodes.OK, 'Job fetched successfully.', job);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await jobRepository.findJobById(req.params.id);
    if (!job) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Job not found for update');
      return responseUtils.response(res);
    }

    const updatedJob = await jobRepository.updateJobById(req.params.id, req.body);
    if (!updatedJob) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Job not found for update');
      return responseUtils.response(res);
    }

    responseUtils.handleSuccess(StatusCodes.OK, 'Job updated successfully.', updatedJob);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await jobRepository.findJobById(req.params.id);
    if (!job) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Job not found for deletion');
      return responseUtils.response(res);
    }

    const deletedJob = await jobRepository.deleteJobById(req.params.id);
    if (!deletedJob) {
      responseUtils.handleError(StatusCodes.NOT_FOUND, 'Job not found for deletion');
      return responseUtils.response(res);
    }

    responseUtils.handleSuccess(StatusCodes.OK, 'Job deleted successfully.', deletedJob);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

export default {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
};
