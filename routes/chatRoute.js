const express = require("express");
const askGemini = require("../services/geminiService");
const { getSession, updateMessageCount } = require("../utils/sessionManager");

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { sessionId, question, conversationHistory } = req.body;
  if (!sessionId || !question?.trim()) return res.status(400).json({ error: "Session ID and question required." });

  const session = getSession(sessionId);
  if (!session) return res.status(404).json({ error: "Session not found." });

  updateMessageCount(sessionId);
  const result = await askGemini(session.pdfContent, question, conversationHistory);
  if (result.error) return res.status(500).json(result);

  res.json({ ...result, sessionId, messageCount: session.messageCount + 1 });
});

module.exports = router;
