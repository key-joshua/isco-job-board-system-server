import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Jobs', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true, },
      title: { type: DataTypes.STRING, allowNull: false, },
      company: { type: DataTypes.STRING, allowNull: false, },
      department: { type: DataTypes.STRING, allowNull: false, },
      location: { type: DataTypes.STRING, allowNull: false, },
      salary: { type: DataTypes.STRING, allowNull: false, },
      type: { type: DataTypes.STRING, allowNull: false, },
      status: { type: DataTypes.STRING, allowNull: false, },
      description: { type: DataTypes.STRING(5000), allowNull: false, },
      requirements: { type: DataTypes.STRING(5000), allowNull: false, },
      benefits: { type: DataTypes.STRING(5000), allowNull: false, },
      contact_email: { type: DataTypes.STRING, allowNull: false, },
      deadline: { type: DataTypes.DATE, allowNull: false, },
      is_active: { type: DataTypes.BOOLEAN, allowNull: false, },
      is_remote: { type: DataTypes.BOOLEAN, allowNull: false, },
      is_urgent: { type: DataTypes.BOOLEAN, allowNull: false, },
      available_positions: { type: DataTypes.INTEGER, allowNull: false, },
      attachment: { type: DataTypes.STRING(5000), allowNull: true, defaultValue: null },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Jobs');
  },
};
