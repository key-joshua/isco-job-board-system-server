import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Sessions', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      user_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'Users', key: 'id' }, onDelete: 'CASCADE' },
      device_id: { type: DataTypes.STRING, allowNull: true },
      access_token: { type: DataTypes.STRING(1000), allowNull: false },
      refresh_token: { type: DataTypes.STRING(1000), allowNull: false },
      created_at: { allowNull: false, type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { allowNull: false, type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Sessions');
  }
};
