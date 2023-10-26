const db = require("../models");
const User = db.user;
// const config = require("../config/auth.config");
// const fs = require("fs");
// const Logger = require("../rebound/logger");

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      console.info(user);
      if (!user) {
        return res.status(404).send({
          status: false,
          message: "Invalid Username or Password!",
        });
      } else {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(404).send({
            status: false,
            message: "Invalid Username or Password!",
          });
        }
        var token = jwt.sign(
          {
            id: user.id,
            pass: user.password,
            fullname: user.fullname,
          },
          process.env.KEY_JWT,
          {
            expiresIn: "12h", // 12 hours
          }
        );
        return res.status(200).send({
          userId: user.id,
          username: user.username,
          fullname: user.fullname,
          phone: user.phone,
          accessToken: token,
          expiresIn: "12 Hours",
          status: true,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
};

exports.register = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password);
    }
    const timestamp = new Date().toISOString();
    console.info("#" + timestamp + "//" + req.body);
    const crud = await db.user.create(req.body);
    res.status(201).json({
      status: true,
      message: "registration successful",
      payload: crud,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ status: false, message: "data already exists" });
    } else {
      console.error(error);
      res
        .status(500)
        .json({ status: false, message: "Failed to register user" });
    }
  }
  const timestamp = new Date().toISOString();
  console.info(timestamp + "#");
};
