// controllers/crudController.js
// const { json } = require("body-parser");
const db = require("../models");
// var bcrypt = require("bcryptjs");
const Op = db.Sequelize.Op;
// const associations = require("../config/associations");

// Create Data
exports.create = async (req, res) => {
  try {
    // const tb = req.params.table;
    // if (tb === "user") {
    //   res.status(400).json({ status: false, message: "Not Found" });
    // }
    // const timestamp = new Date().toISOString();

    req.body.created = req.userId;
    // console.info(
    //   "#" + timestamp + "/" + req.userId + "//" + JSON.stringify(req.body)
    // );
    const crud = await db.todo.create(req.body);
    res.status(201).json({ status: true, payload: crud });
    // console.info({ status: true, payload: crud });
  } catch (error) {
    console.error(error);
    if (error.message) {
      // Jika error adalah kesalahan validasi Sequelize (contohnya, data tidak valid)
      res.status(400).json({ status: false, message: error.message });
    } else {
      // Jika error bukan kesalahan validasi Sequelize (contohnya, kesalahan server)
      res.status(500).json({ status: false, message: error.message });
    }
    const timestamp = new Date().toISOString();
    // console.info(timestamp + "/" + req.userId + "//" + req.body + "#");
  }
};

// Read All Datas
exports.getAll = async (req, res) => {
  try {
    let sort;
    let including;
    sort = ["createdAt", "DESC"];
    including = [{ all: true }];
    const where = { created: req.userId };
    // console.log(including);
    const cruds = await db.todo.findAll({
      where: where,
      order: [sort],
      include: including,
    });
    // console.log(cruds);
    res.status(200).json({ status: true, payload: cruds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// Read Data by ID
exports.getById = async (req, res) => {
  try {
    const crudId = req.params.id;
    let sort;
    let including;

    sort = ["createdAt", "DESC"];
    including = [{ all: true }];

    const crud = await db.todo.findByPk(crudId, { include: including });
    if (!crud) {
      res.status(404).json({ status: false, message: "Data not found" });
      return;
    }
    res.status(200).json({ status: true, payload: crud });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getBy = async (req, res) => {
  const getby = req.query;
  getby.created=req.userId;
  try {
    let sort;
    const crudId = req.params.id;
    const tb = req.params.table;
    switch (tb) {
      case "detailpenawaran":
        sort = ["alias", "ASC"];
        console.log(tb);
        break;
      default:
        sort = ["createdAt", "DESC"];
        break;
    }
    const crud = await db.todo.findAll({
      where: getby,
      order: [sort],
      include: { all: true },
    });
    if (!crud) {
      res.status(404).json({ status: false, message: "Data not found" });
      return;
    }
    res.status(200).json({ status: true, payload: crud });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getBydate = async (req, res) => {
  const getby = req.query;
  const { start, end } = req.params;

  try {
    let sort;
    console.log(start);
    getby.created=req.userId;
    getby.datetodo = { [Op.between]: [start, end] };
    // const crudId = req.params.id;
    sort = ["createdAt", "DESC"];
    console.info(getby);
    const crud = await db.todo.findAll({
      where: getby,
      order: [sort],
      include: { all: true },
    });
    if (!crud) {
      res.status(404).json({ status: false, message: "Data not found" });
      return;
    }
    res.status(200).json({ status: true, payload: crud });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// Update Data by ID
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    // const tb = req.params.table;
    // console.log(id);
    // console.log("here");
    req.body.updated = req.userId;
    // if (tb === "user" && req.body.password) {
    //   req.body.password = bcrypt.hashSync(req.body.password);
    // }
    const crud = await db.todo.update(req.body, {
      where: { id: id },
    });
    const crud2 = await db.todo.findByPk(id);
    if (!crud2) {
      res.status(404).json({ status: false, message: "Data not found" });
      return;
    }

    res
      .status(200)
      .json({ status: true, message: "Data updated", payload: crud2 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// Delete Data by ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    // const tb = req.params.table;
    const crud = await db.todo.findByPk(id);
    if (!crud) {
      res.status(404).json({ status: false, message: "Data not found" });
      return;
    }
    await crud.destroy();
    res.status(200).json({ status: true, message: "Data deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};
