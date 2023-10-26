const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Role = db.role;
const User = db.user;
var bcrypt = require("bcryptjs");

verifyToken = (req, res, next) => {
  if (!req.headers["xtoken"]) {
    return res.status(401).send({
      message: "No token provided!",
      status: false,
    });
  }

  let token = req.headers["xtoken"];

  if (!token) {
    return res.status(401).send({
      message: "No token provided!",
      status: false,
    });
  }
  //   if (req.headers["x-access-token"].split(" ")[0] != "Appkeys") {
  //     return res.status(401).json({
  //       errors: [{ message: "Unauthenticated!" }],
  //     });
  //   }
  jwt.verify(token, process.env.KEY_JWT, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
        status: false,
      });
    }
    req.userId = decoded.id;
    req.pass = decoded.pass;
    req.fullname = decoded.fullname;
    console.log(decoded);
    // console.info(req.pass);

    User.findOne({ where: { id: req.userId, password: req.pass } })
      .then((dt) => {
        // console.log(dt.id);
        if (dt) {
          console.log(dt.id);
          next();
        } else {
          return res.status(401).send({
            message: "Unauthorized!",
            status: false,
          });
        }
      })
      .catch((err) => {
        return res.status(500).send({
          status: false,
          message: err.message || "Some error occurred while retrieving Users.",
        });
      });
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
