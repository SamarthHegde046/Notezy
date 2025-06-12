const chatSessions = new Map();

function createSession(sessionId, data) {
  chatSessions.set(sessionId, { ...data, messageCount: 0 });
}

function getSession(sessionId) {
  return chatSessions.get(sessionId);
}

function deleteSession(sessionId) {
  return chatSessions.delete(sessionId);
}

function updateMessageCount(sessionId) {
  const session = chatSessions.get(sessionId);
  if (session) session.messageCount += 1;
}

function cleanupOldSessions(hours = 1) {
  const cutoff = Date.now() - hours * 60 * 60 * 1000;
  for (const [id, session] of chatSessions.entries()) {
    if (session.uploadTime.getTime() < cutoff) {
      chatSessions.delete(id);
      console.log(`Cleaned up expired session: ${id}`);
    }
  }
}

module.exports = {
  createSession,
  getSession,
  deleteSession,
  updateMessageCount,
  cleanupOldSessions,
  chatSessions,
};
