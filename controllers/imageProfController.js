// Create and Save a new Vendor
// Delete a Vendor with the specified id in the request
// const path = require('path');
const db = require("../models");

exports.upload = (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No image file uploaded" });
  }
  const id = req.userId;
  let updateData = { image: file.filename, images: file.filename };
  db.user
    .update(updateData, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Image upload successful",
          filename: file.filename,
        });
      } else {
        res.send({
          message: `Cannot update with id=${id}! id not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating with id=" + id,
      });
    });
  // const imagePath = path.join(__dirname, 'uploads/', file.filename);

  // return res.status(200).json({ message: 'Image upload successful', filename: file.filename });
};
// Delete all Vendors from the database.
exports.getimage = (req, res) => {
  const fs = require("fs");
  const filePath = "./image/user/" + req.params.filename;
  const image = fs.readFileSync(filePath);
  const fileExtension = req.params.filename.split(".").pop();

  let contentType = "";
  switch (fileExtension) {
    case "jpg":
    case "jpeg":
      contentType = "image/jpeg";
      break;
    case "png":
      contentType = "image/png";
      break;
    case "gif":
      contentType = "image/gif";
      break;
    // Tambahkan case untuk tipe file gambar lain jika diperlukan
    default:
      // Jika tipe tidak dikenal, Anda bisa mengirim status 415 Unsupported Media Type
      return res.status(415).send("Unsupported Media Type");
  }

  // Set the content-type header and send the image data
  res.set("Content-Type", contentType);
  res.send(image);
};
