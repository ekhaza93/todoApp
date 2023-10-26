module.exports = (app) => {
  const auths = require("../controllers/authController.js");
  var router = require("express").Router();
  router.post("/login", auths.login);
  router.post("/register", auths.register);
  // router.delete("/", auths.deleteAll);
  app.use("/api/auth/", router);
};
