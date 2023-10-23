import dbConfig from "../config/db-conf.js";
import Sequelize from "sequelize";
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

db.user = require("./user.js").default(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);

export default db;
