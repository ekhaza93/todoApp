// app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config();
// Menggunakan body-parser untuk mengurai permintaan dalam format JSON
app.use(bodyParser.json());

// Menggunakan CORS untuk mengatasi masalah kebijakan lintas sumber
app.use(cors());
// Menggunakan Helmet untuk meningkatkan keamanan
app.use(helmet());

const db = require("./models");
// const init = require("./app/initialize");
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.error("Failed to sync db: " + err.message);
  });
// Rute untuk entitas User

require("./routes/todoRoute")(app);
require("./routes/authRoute")(app);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
