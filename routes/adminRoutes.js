//adminRoutes.js
const express = require("express");
const router = express.Router();
const { updateFromDrive } = require("../controllers/adminDriveController");

router.post("/update-drive-links", updateFromDrive);

module.exports = router;
