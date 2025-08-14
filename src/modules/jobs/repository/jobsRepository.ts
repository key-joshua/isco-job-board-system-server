import models from '../../../database/models';
import { Op, col, cast, where as sequelizeWhere } from 'sequelize';

const createJob = async (body) => {
  return await models.Jobs.create(body);
};

const findJobById = async (jobId) => {
  return await models.Jobs.findByPk(jobId);
};

const findAllJobs = async (filter: { keyword?: string; [key: string]: any } = {}) => {
  const { keyword, ...rest } = filter;
  let where: any = { ...rest };

  if (keyword) {
    const words = keyword.trim().split(/\s+/);
    const keywordConditions = words.flatMap((word): any => [
      { title: { [Op.iLike]: `%${word}%` } },
      { type: { [Op.iLike]: `%${word}%` } },
      { is_active: { [Op.iLike]: `%${word}%` } },
      { is_remote: { [Op.iLike]: `%${word}%` } },
      { is_urgent: { [Op.iLike]: `%${word}%` } },
      { description: { [Op.iLike]: `%${word}%` } },
      sequelizeWhere(cast(col('job_available_positions'), 'TEXT'), { [Op.iLike]: `%${word}%` }),
    ]);

    where = { ...where, [Op.or]: keywordConditions, };
  }

  return await models.Jobs.findAll({ where, order: [['updated_at', 'DESC']] });
};

const updateJobById = async (jobId, update) => {
  await models.Jobs.update(update, { where: { id: jobId } });
  return await models.Jobs.findByPk(jobId);
};

const deleteJobById = async (jobId) => {
  return await models.Jobs.destroy({ where: { id: jobId } });
};

export default {
  createJob,
  findJobById,
  findAllJobs,
  updateJobById,
  deleteJobById,
};
