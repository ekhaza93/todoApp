const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  config: {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIAL,
    // operatorsAliases: false,
    port: process.env.DB_PORT,
  },
};
// console.log(process.env.DB_DIAL);
module.exports = dbConfig;
