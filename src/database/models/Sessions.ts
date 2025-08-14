import { Sequelize, Model, DataTypes } from 'sequelize';

export interface SessionInterface {
  id?: string;
  user_id: string;
  device_id?: string | null;
  access_token: string;
  refresh_token: string;
  created_at?: Date;
  updated_at?: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Sessions extends Model<SessionInterface> implements SessionInterface {
    declare id: string;
    declare user_id: string;
    declare device_id: string | null;
    declare access_token: string;
    declare refresh_token: string;
    declare created_at: Date;
    declare updated_at: Date;

    static associate(models) {
      Sessions.belongsTo(models.Users, { as: 'Users', foreignKey: 'user_id', onDelete: 'CASCADE' });
    }
  }

  Sessions.init(
    {
      id: { type: dataTypes.UUID, defaultValue: dataTypes.UUIDV4, allowNull: false, primaryKey: true, },
      user_id: { type: dataTypes.UUID, allowNull: false, },
      device_id: { type: dataTypes.STRING, allowNull: true, },
      access_token: { type: dataTypes.STRING(1000), allowNull: false, },
      refresh_token: { type: dataTypes.STRING(1000), allowNull: false, },
      created_at: { field: 'created_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW, },
      updated_at: { field: 'updated_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW, },
    }, { sequelize, modelName: 'Sessions', tableName: 'Sessions', timestamps: true, underscored: true } );

  return Sessions;
};
