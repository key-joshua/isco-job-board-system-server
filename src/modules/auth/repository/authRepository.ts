import models from '../../../database/models';
import { hashPassword } from '../../../utils/passwordUtils';

const createUser = async (body) => {
  const isGoogle = body.is_google === 'false' || body.is_google === false ? false : true;
  
  const is_verified = isGoogle;
  if (is_verified) delete body.password;
  if (body.password) body.password = hashPassword(body.password);

  return await models.Users.create({ ...body, is_verified });
};

const findUserByAttributes = async ({ whereKey, whereValue }) => {
  return await models.Users.findOne({ where: { [whereKey]: whereValue }, include: [ { model: models.Applicants, as: 'Applicants' } ] });
};

const updateUserByAttributes = async ({ updatedKey, updatedValue, whereKey, whereValue }) => {
  await models.Users.update({ [updatedKey]: updatedValue }, { where: { [whereKey]: whereValue } });
  return await models.Users.findOne({ where: { [whereKey]: whereValue } });
};

const createSession = async (body) => {
  return await models.Sessions.create(body);
};

const findSessionByAttributes = async ({ updatedKey, updatedValue, whereKey, whereValue }) => {
  return await models.Sessions.findOne({ where: { [updatedKey]: updatedValue, [whereKey]: whereValue } });
};

const findSessionByTripleAttributes = async ({ updatedKey, updatedValue, whereKeyI, whereValueI, whereKeyII, whereValueII }) => {
  return await models.Sessions.findOne({ where: { [updatedKey]: updatedValue, [whereKeyI]: whereValueI, [whereKeyII]: whereValueII } });
};

const destroySessionByAttribute = async ({ updatedKey, updatedValue, whereKey, whereValue }) => {
  return await models.Sessions.destroy({ where: { [updatedKey]: updatedValue, [whereKey]: whereValue } });
};

export default {
  createUser,
  createSession,
  findUserByAttributes,
  updateUserByAttributes,
  findSessionByAttributes,
  destroySessionByAttribute,
  findSessionByTripleAttributes,
};
