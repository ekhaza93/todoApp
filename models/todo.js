const Todo = (sequelize, Sequelize) =>
  sequelize.define("tb_todo", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    tittle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    datetodo: {
      type: Sequelize.DATEONLY,
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: "null.jpg",
    },
    state: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
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

module.exports = Todo;
