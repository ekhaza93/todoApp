module.exports = (app) => {
  const uploadImage = require("../controllers/imageProfController.js");
  const multer = require("multer");
  const path = require("path");
  var router = require("express").Router();
  var router2 = require("express").Router();
  const auth = require("../middlewares/auth.js");
  const { v4: uuidv4 } = require("uuid");
  const allowedImageTypes = ["image/jpeg", "image/png"];

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./image/user");
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const randomstring = uuidv4();
      // const randomString = randomstring.generate(16);
      cb(null, randomstring + ext);
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (allowedImageTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only JPEG, PNG, and GIF image files are allowed"));
      }
    },
  });

  router.post("/user/", upload.single("imageFile"), uploadImage.upload);

  router2.get("/user/:filename", uploadImage.getimage);

  app.use("/api/files/upload", [auth.verifyToken], router);

  app.use("/api/files/get", router2);
};
