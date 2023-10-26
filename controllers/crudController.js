// controllers/crudController.js
const db = require("../models");
var bcrypt = require("bcryptjs");
// const associations = require("../config/associations");

// Create Data
exports.create = async (req, res) => {
  try {
    const tb = req.params.table;
    if (tb === "user") {
      res.status(400).json({ status: false, message: "Not Found" });
    }
    req.body.created = req.userId;
    const crud = await db[tb].create(req.body);
    res.status(201).json({ status: true, payload: crud });
  } catch (error) {
    console.error(error);
    if (error.message) {
      // Jika error adalah kesalahan validasi Sequelize (contohnya, data tidak valid)
      res.status(400).json({ status: false, message: error.message });
    } else {
      // Jika error bukan kesalahan validasi Sequelize (contohnya, kesalahan server)
      res.status(500).json({ status: false, message: error.message });
    }
  }
};

// Read All Datas
exports.getAll = async (req, res) => {
  try {
    let sort;
    let including;
    const tb = req.params.table;
    switch (tb) {
      case "detailpenawaran":
        sort = ["alias", "ASC"];
        including = [{ all: true }];
        // console.log(tb);
        break;
      case "mst_alat":
      case "client":
        sort = ["nama", "ASC"];
        including = [{ all: true }];
        // console.log(tb);
        break;
      case "penawaran":
        sort = ["createdAt", "DESC"];
        including = [
          { all: true },
          { model: db.benefit, include: [{ model: db.benefit_detail }] },
          { model: db.kondisi, include: [{ model: db.kondisi_detail }] },
        ];
        break;
      default:
        sort = ["createdAt", "DESC"];
        including = [{ all: true }];
        break;
    }
    // console.log(including);
    const cruds = await db[tb].findAll({
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
    const tb = req.params.table;
    switch (tb) {
      case "detailpenawaran":
        sort = ["alias", "ASC"];
        including = [{ all: true }];
        // console.log(tb);
        break;
      case "mst_alat":
      case "client":
        sort = ["nama", "ASC"];
        including = [{ all: true }];
        // console.log(tb);
        break;
      case "penawaran":
        sort = ["createdAt", "DESC"];
        including = [
          { all: true },
          { model: db.benefit, include: [{ model: db.benefit_detail }] },
          { model: db.kondisi, include: [{ model: db.kondisi_detail }] },
        ];
        break;
      default:
        sort = ["createdAt", "DESC"];
        including = [{ all: true }];
        break;
    }
    const crud = await db[tb].findByPk(crudId, { include: including });
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
    const crud = await db[tb].findAll({
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
    const tb = req.params.table;
    console.log(id);
    console.log("here");
    req.body.updated = req.userId;
    if (tb === "user" && req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password);
    }
    const crud = await db[tb].update(req.body, {
      where: { id: id },
    });
    const crud2 = await db[tb].findByPk(id);
    if (!crud2) {
      res.status(404).json({ message: "Data not found" });
      return;
    }

    res.status(200).json({ status: true, payload: crud2 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// Delete Data by ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const tb = req.params.table;
    const crud = await db[tb].findByPk(id);
    if (!crud) {
      res.status(404).json({ message: "Data not found" });
      return;
    }
    await crud.destroy();
    res.status(204).json({ status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};
