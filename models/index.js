const dbConfig = require("../config/db-conf.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  dbConfig.config
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// db.OP = Sequelize.Op;

db.user = require("./user.js")(sequelize, Sequelize);
db.todo = require("./todo.js")(sequelize, Sequelize);

module.exports = db;
