import { Sequelize, Model, DataTypes } from 'sequelize';

export interface JobInterface {
  id?: string;
  title: string;
  company: string;
  department: string;
  location: string;
  salary: string;
  type: string;
  status: string;
  description: string;
  requirements: string;
  benefits: string;
  contact_email: string;
  deadline: Date;
  is_active: boolean;
  is_remote: boolean;
  is_urgent: boolean;
  attachment: string;
  available_positions: number;
  created_at?: Date;
  updated_at?: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Jobs extends Model<JobInterface> implements JobInterface {
    declare id: string;
    declare title: string;
    declare company: string;
    declare department: string;
    declare location: string;
    declare salary: string;
    declare type: string;
    declare status: string;
    declare description: string;
    declare requirements: string;
    declare benefits: string;
    declare contact_email: string;
    declare deadline: Date;
    declare is_active: boolean;
    declare is_remote: boolean;
    declare is_urgent: boolean;
    declare attachment: string;
    declare available_positions: number;
    declare created_at: Date;
    declare updated_at: Date;
    static associate(models) {
      Jobs.hasMany(models.Applicants, { as: 'Applicants', foreignKey: 'job_id', onDelete: 'CASCADE' });
    }
  }

  Jobs.init(
    {
      id: { type: dataTypes.UUID, defaultValue: dataTypes.UUIDV4, allowNull: false, primaryKey: true },
      title: { type: dataTypes.STRING, allowNull: false },
      company: { type: dataTypes.STRING, allowNull: false },
      department: { type: dataTypes.STRING, allowNull: false },
      location: { type: dataTypes.STRING, allowNull: false },
      salary: { type: dataTypes.STRING, allowNull: false },
      type: { type: dataTypes.STRING, allowNull: false },
      status: { type: dataTypes.STRING, allowNull: false },
      description: { type: dataTypes.STRING(5000), allowNull: false },
      requirements: { type: dataTypes.STRING(5000), allowNull: false },
      benefits: { type: dataTypes.STRING(5000), allowNull: false },
      contact_email: { type: dataTypes.STRING, allowNull: false },
      deadline: { type: dataTypes.DATE, allowNull: false },
      is_active: { type: dataTypes.BOOLEAN, allowNull: false },
      is_remote: { type: dataTypes.BOOLEAN, allowNull: false },
      is_urgent: { type: dataTypes.BOOLEAN, allowNull: false },
      available_positions: { type: dataTypes.INTEGER, allowNull: false },
      attachment: { type: dataTypes.STRING(5000), allowNull: true, defaultValue: null },
      created_at: { field: 'created_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },
      updated_at: { field: 'updated_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },
    }, { sequelize, modelName: 'Jobs', tableName: 'Jobs', timestamps: true, underscored: true }
  );

  return Jobs;
};
