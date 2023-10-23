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
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      default: "L",
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

export default User;
