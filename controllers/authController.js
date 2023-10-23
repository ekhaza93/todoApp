import db from "../models";
const User = db.user;
// const config = require("../config/auth.config");
// const fs = require("fs");
// const Logger = require("../rebound/logger");

import { compareSync, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
export function login(req, res) {
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
        var passwordIsValid = compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
          return res.status(404).send({
            status: false,
            message: "Invalid Username or Password!",
          });
        }
        var token = sign(
          {
            id: user.id,
            role: user.rolecode,
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
          role: user.rolecode,
          accessToken: token,
          expiresIn: "12 Hours",
          status: true,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
}

export function changePassword(req, res) {
  User.findOne({
    where: {
      id: req.userId,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "Invalid Username or Password!" });
      }

      ImUser.findOne({
        where: {
          userId: req.userId,
        },
      }).then((imuser) => {
        var passwordIsValid = compareSync(
          req.body.passwordOld,
          imuser.password
        );

        if (!passwordIsValid) {
          return res.status(400).send({
            status: false,
            message: "Invalid Username or Password!",
          });
        } else {
          ImUser.update(
            {
              password: hashSync(req.body.passwordNew),
              forceChangePassword: false,
            },
            {
              where: { id: imuser.id },
            }
          )
            .then((num) => {
              if (num == 1) {
                res.send({
                  status: true,
                  message: "Change password was updated successfully.",
                });
              } else {
                res.send({
                  status: false,
                  message: `failed change password`,
                });
              }
            })
            .catch((err) => {
              res.status(500).send({
                status: false,
                message: "failed change password",
              });
            });
        }
      });
    })
    .catch((err) => {
      res.status(500).send({ status: false, message: err.message });
    });
}
