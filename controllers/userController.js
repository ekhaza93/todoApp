// controllers/crudController.js
// const { json } = require("body-parser");
const db = require("../models");
// var bcrypt = require("bcryptjs");
const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");
// const associations = require("../config/associations");

// Read All Datas
exports.getProfile = async (req, res) => {
    try {
        const crudId = req.userId;
        let sort;
        let including;
    
        sort = ["createdAt", "DESC"];
        including = [{ all: true }];
    
        const crud = await db.user.findByPk(crudId, { include: including });
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
    const id = req.userId;
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password);
      }
    // const tb = req.params.table;
    // console.log(id);
    // console.log("here");
    req.body.updated = req.userId;
    // if (tb === "user" && req.body.password) {
    //   req.body.password = bcrypt.hashSync(req.body.password);
    // }
    const crud = await db.user.update(req.body, {
      where: { id: id },
    });
    const crud2 = await db.user.findByPk(id);
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
