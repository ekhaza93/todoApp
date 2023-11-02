module.exports = (app) => {
    const cruds = require("../controllers/userController.js");
    var router = require("express").Router();
    const auth = require("../middlewares/auth.js");
    // Create a new User
    // Retrieve all cruds
    router.get("/user/profile", cruds.getProfile);
    // Update a User with id
    router.put("/user/profile", cruds.update);
    // Create a new User
    // router.delete("/", cruds.deleteAll);
    app.use("/api/trx/", [auth.verifyToken], router);
  };
  