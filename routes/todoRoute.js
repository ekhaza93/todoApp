module.exports = (app) => {
  const cruds = require("../controllers/todoController.js");
  var router = require("express").Router();
  const auth = require("../middlewares/auth.js");
  // Create a new User
  router.post("/todo", cruds.create);
  // Retrieve all cruds
  router.get("/todo", cruds.getAll);
  // Retrieve a single User with id
  router.get("/todo/detail/:id", cruds.getById);
  router.get("/todo/by/", cruds.getBy);
  router.get("/todo/bydate/:start/:end", cruds.getBydate);
  // Update a User with id
  router.put("/todo/:id", cruds.update);
  // Delete a User with id
  router.delete("/todo/:id", cruds.delete);
  // Create a new User
  // router.delete("/", cruds.deleteAll);
  app.use("/api/trx/", [auth.verifyToken], router);
};
