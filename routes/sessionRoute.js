const express = require("express");
const { getSession, deleteSession, chatSessions } = require("../utils/sessionManager");

const router = express.Router();

router.get("/session/:sessionId", (req, res) => {
  const session = getSession(req.params.sessionId);
  if (!session) return res.status(404).json({ error: "Session not found." });
  res.json({ ...session, sessionId: req.params.sessionId });
});

router.delete("/session/:sessionId", (req, res) => {
  if (!deleteSession(req.params.sessionId)) return res.status(404).json({ error: "Session not found." });
  res.json({ message: "Session deleted." });
});

router.get("/health", (req, res) => {
  res.json({ status: "OK", activeSessions: chatSessions.size, timestamp: new Date() });
});

module.exports = router;
