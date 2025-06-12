const express = require("express");
const axios = require("axios");
const pdfParse = require("pdf-parse");
const upload = require("../config/uploadConfig");
const { createSession } = require("../utils/sessionManager");

const router = express.Router();

router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file?.path) return res.status(400).json({ error: "PDF file required." });

    const sessionId = Date.now().toString();
    const response = await axios.get(req.file.path, { responseType: "arraybuffer" });
    const text = (await pdfParse(Buffer.from(response.data))).text;

    if (!text.trim()) return res.status(400).json({ error: "No text in PDF." });

    createSession(sessionId, {
      pdfContent: text,
      filename: req.file.originalname,
      cloudinaryUrl: req.file.path,
      uploadTime: new Date()
    });

    res.json({ sessionId, filename: req.file.originalname, cloudinaryUrl: req.file.path });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process PDF." });
  }
});

module.exports = router;
