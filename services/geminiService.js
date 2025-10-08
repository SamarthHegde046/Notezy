const axios = require("axios");
GEMINI_API_KEY="AIzaSyB0PG_S3DUIPYppTS790sfkxb-pZAyOaqg";
const GEMINI_API_KE = GEMINI_API_KEY;
if (!GEMINI_API_KE) {
  console.error("GEMINI_API_KEY is missing.");
  process.exit(1);
}

async function askGemini(content, question, conversationHistory = []) {
  let contextPrompt = "";
  if (conversationHistory?.length > 0) {
    const recentHistory = conversationHistory
      .filter(msg => msg.type === 'user' || msg.type === 'bot')
      .slice(-6)
      .map(msg => `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');
    contextPrompt = `\n\n### Previous Conversation Context:\n${recentHistory}\n`;
  }

  const prompt = `You are a helpful PDF analysis assistant...
${contextPrompt}
### PDF Content:
${content}
### Current Question:
${question}
...
{"response": "Based on the document, I can see that..."}`;
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KE}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.9,
          maxOutputTokens: 1024,
        }
      },
      { headers: { "Content-Type": "application/json" }, timeout: 30000 }
    );

    const text = response.data.candidates[0].content.parts[0].text;
    const cleaned = text.replace(/```json\n|\n```/g, "").trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      return { response: cleaned };
    }
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    if (err.code === 'ECONNABORTED') return { error: "Request timed out." };
    if (err.response?.status === 429) return { error: "API rate limit exceeded." };
    if (err.response?.status === 400) return { error: "Invalid request to Gemini." };
    return { error: `Failed to process: ${err.message}` };
  }
}

module.exports = askGemini;
