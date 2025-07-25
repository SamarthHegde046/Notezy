// uploadConfig.js
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary1"); // from step 2

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "pdf_uploads",
    allowed_formats: ["pdf"],
    resource_type: "raw",
  },
});

const multer = require("multer");
const upload = multer({ storage });

module.exports = upload;
