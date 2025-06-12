const express = require("express");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const askGemini = require("../services/geminiService");
const upload = require("../config/uploadConfig");

const router = express.Router();

router.post("/analyze", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file || !req.body.question) {
      return res.status(400).json({ error: "PDF file and question are required." });
    }

    const question = req.body.question;

    // Read PDF from Cloudinary URL using axios
    const axios = require("axios");
    const response = await axios.get(req.file.path, { responseType: "arraybuffer" });
    const pdfBuffer = Buffer.from(response.data);
    const pdfData = await pdfParse(pdfBuffer);
    const text = pdfData.text;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "No text found in the PDF." });
    }

    // Optional conversation history
    let conversationHistory = [];
    if (req.body.conversation_history) {
      try {
        conversationHistory = JSON.parse(req.body.conversation_history);
      } catch {
        // Invalid JSON — ignore
      }
    }

    // Ask Gemini
    const result = await askGemini(text, question, conversationHistory);

    if (result.error) {
      return res.status(500).json(result);
    }

    // Optional backward-compatible transformation
    if (result.response && !result.points) {
      const lines = result.response.split('\n').filter(line => line.trim());
      result.points = lines.length > 1 ? lines : [result.response];
    }

    res.json(result);

  } catch (error) {
    console.error("Analyze Error:", error.message);
    res.status(500).json({ error: "Failed to analyze PDF." });
  }
});

module.exports = router;
