import { Sequelize, Model, DataTypes } from 'sequelize';

export interface ApplicantInterface {
  id?: string;
  user_id: string;
  job_id: string;
  full_name: string;
  email: string;
  status: 'PENDING' | 'REJECTED' | 'APPROVED';
  message: string;
  cover_letter?: string | null;
  resume: string;
  created_at?: Date;
  updated_at?: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Applicants extends Model<ApplicantInterface> implements ApplicantInterface {
    declare id: string;
    declare user_id: string;
    declare job_id: string;
    declare full_name: string;
    declare email: string;
    declare status: 'PENDING' | 'REJECTED' | 'APPROVED';
    declare message: string;
    declare cover_letter: string | null;
    declare resume: string;
    declare created_at: Date;
    declare updated_at: Date;

    static associate(models: any) {
      Applicants.belongsTo(models.Users, { as: 'Users', foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
      Applicants.belongsTo(models.Jobs, { as: 'Jobs', foreignKey: 'job_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }

  Applicants.init(
    {
      id: { type: dataTypes.UUID, defaultValue: dataTypes.UUIDV4, allowNull: false, primaryKey: true },
      user_id: { type: dataTypes.UUID, allowNull: false },
      job_id: { type: dataTypes.UUID, allowNull: false },
      full_name: { type: dataTypes.STRING, allowNull: false },
      email: { type: dataTypes.STRING, allowNull: false },
      status: { type: dataTypes.STRING, allowNull: false, defaultValue: 'PENDING' },
      message: { type: dataTypes.TEXT, allowNull: true, defaultValue: null },
      cover_letter: { type: dataTypes.STRING, allowNull: true, defaultValue: null },
      resume: { type: dataTypes.STRING, allowNull: false },
      created_at: { field: 'created_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },
      updated_at: { field: 'updated_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },
    }, { sequelize, modelName: 'Applicants', tableName: 'Applicants', timestamps: true, underscored: true, }
  );

  return Applicants;
};
