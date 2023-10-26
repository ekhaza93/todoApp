module.exports = (app) => {
  const cruds = require("../controllers/crudController.js");
  var router = require("express").Router();
  const auth = require("../middlewares/auth.js");
  // Create a new User
  router.post("/:table", cruds.create);
  // Retrieve all cruds
  router.get("/:table", cruds.getAll);
  // Retrieve a single User with id
  router.get("/:table/getone/:id", cruds.getById);
  router.get("/:table/by/", cruds.getBy);
  // Update a User with id
  router.put("/:table/:id", cruds.update);
  // Delete a User with id
  router.delete("/:table/:id", cruds.delete);
  // Create a new User
  // router.delete("/", cruds.deleteAll);
  app.use("/api/crud/", [auth.verifyToken], router);
};
