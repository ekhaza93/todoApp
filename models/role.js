// models/role.js

const Role = (sequelize, Sequelize) =>
  sequelize.define("tb_role", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    priority: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    rolecode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    created: {
      type: Sequelize.UUID,
    },
    updated: {
      type: Sequelize.UUID,
    },
  });

module.exports = Role;
