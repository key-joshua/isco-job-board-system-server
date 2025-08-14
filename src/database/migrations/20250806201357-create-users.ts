import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Users', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      username: { type: DataTypes.STRING, allowNull: false },
      profile_picture: { type: DataTypes.STRING, allowNull: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: true },
      is_google: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
      is_verified: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
      role: { type: DataTypes.ENUM('ADMIN', 'APPLICANT'), allowNull: false, defaultValue: 'APPLICANT' },
      created_at: { allowNull: false, type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { allowNull: false, type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Users');
  }
};
