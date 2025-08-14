import { Sequelize, Model, DataTypes } from 'sequelize';

export interface UserInterface {
    id?: string;
    username: string;
    profile_picture?: string | null;
    email: string;
    password: string;
    is_google?: boolean;
    is_verified?: boolean;
    role?: 'ADMIN' | 'APPLICANT';
    created_at?: Date;
    updated_at?: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Users extends Model<UserInterface> implements UserInterface {
    declare id: string;
    declare username: string;
    declare profile_picture: string | null;
    declare email: string;
    declare password: string;
    declare is_google: boolean;
    declare is_verified: boolean;
    declare role: 'ADMIN' | 'APPLICANT';
    declare created_at: Date;
    declare updated_at: Date;

    static associate(models) {
      Users.hasMany(models.Sessions, { as: 'Sessions', foreignKey: 'user_id', onDelete: 'CASCADE' });
      Users.hasMany(models.Applicants, { as: 'Applicants', foreignKey: 'user_id', onDelete: 'CASCADE' });
    }
  }

  Users.init(
    {
      id: { type: dataTypes.UUID, defaultValue: dataTypes.UUIDV4, allowNull: false, primaryKey: true },
      username: { type: dataTypes.STRING, allowNull: false },
      profile_picture: { type: dataTypes.STRING, allowNull: true },
      email: { type: dataTypes.STRING, allowNull: false, unique: true },
      password: { type: dataTypes.STRING, allowNull: true },
      is_google: { type: dataTypes.BOOLEAN, defaultValue: false },
      is_verified: { type: dataTypes.BOOLEAN, defaultValue: false },
      role: { type: dataTypes.ENUM('ADMIN', 'APPLICANT'), allowNull: false, defaultValue: 'APPLICANT' },
      created_at: { field: 'created_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },
      updated_at: { field: 'updated_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },
    }, { sequelize, modelName: 'Users', tableName: 'Users', timestamps: true, underscored: true });

  return Users;
};
