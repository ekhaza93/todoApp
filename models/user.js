const User = (sequelize, Sequelize) =>
  sequelize.define("tb_user", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 10],
      },
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dob: {
      type: Sequelize.DATEONLY,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      defaultValue: "L",
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    created: {
      type: Sequelize.UUID,
    },
    updated: {
      type: Sequelize.UUID,
    },
  });

module.exports = User;
