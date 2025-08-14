import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Applicants', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      user_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'Users', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      job_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'Jobs', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      full_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.ENUM('PENDING', 'REJECTED', 'APPROVED'), allowNull: false, defaultValue: 'PENDING' },
      message: { type: DataTypes.TEXT, allowNull: true },
      cover_letter: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
      resume: { type: DataTypes.STRING, allowNull: false },
      created_at: { allowNull: false, type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { allowNull: false, type: DataTypes.DATE, defaultValue: DataTypes.NOW, }
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Applicants');
  },
};
