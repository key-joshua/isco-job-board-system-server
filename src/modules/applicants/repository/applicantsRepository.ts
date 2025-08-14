import models from '../../../database/models';
import { Op, col, cast, where as sequelizeWhere } from 'sequelize';

const createApplicant = async (body) => {
  return await models.Applicants.create(body);
};

const findApplicantById = async (applicantId) => {
  return await models.Applicants.findByPk(applicantId);
};

const findAllApplicants = async (filter: { keyword?: string; [key: string]: any } = {}) => {
  const { keyword, ...rest } = filter;
  let where: any = { ...rest };

  if (keyword) {
    const words = keyword.trim().split(/\s+/);
    const keywordConditions = words.flatMap(word => [
    sequelizeWhere( cast(col('status'), 'TEXT'), { [Op.iLike]: `%${word}%` } ),
    { full_name: { [Op.iLike]: `%${word}%` } }
  ]);

    where = { ...where, [Op.or]: keywordConditions, };
  }

  return await models.Applicants.findAll({ where, order: [['updated_at', 'DESC']] , include: [ { model: models.Users, as: 'Users' }, { model: models.Jobs, as: 'Jobs' } ] });
};

const updateApplicantById = async (applicantId, update) => {
  await models.Applicants.update(update, { where: { id: applicantId } });
  return await models.Applicants.findByPk(applicantId);
};

const deleteApplicantById = async (applicantId) => {
  return await models.Applicants.destroy({ where: { id: applicantId } });
};

export default {
  createApplicant,
  findApplicantById,
  findAllApplicants,
  updateApplicantById,
  deleteApplicantById
};
