const axios = require("axios");

const GEMINI_API_KEY = 'AIzaSyB0PG_S3DUIPYppTS790sfkxb-pZAyOaqg'; 
const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;


function normalizeTitle(text) {
  return text
    .toLowerCase()
    .replace(/\.(pdf|docx|pptx)$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b(notes?|pdf|vtu|question papers?|qp|mqps?)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Extract valid JSON from Gemini response
function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch (err) {
    return null;
  }
}

/* ----------------------------------
   1️⃣ REGEX MATCH (FAST)
---------------------------------- */

async function regexMatchTitle(fileName, titles) {
  const normalizedFile = normalizeTitle(fileName);

  for (const title of titles) {
    const normalizedTitle = normalizeTitle(title);

    const pattern = normalizedTitle
      .split(" ")
      .join(".*"); // flexible match

    const regex = new RegExp(pattern, "i");

    if (regex.test(normalizedFile)) {
      return title;
    }
  }

  return null;
}

/* ----------------------------------
   2️⃣ AI MATCH (FALLBACK)
---------------------------------- */

async function aiMatchTitle(fileName, titles) {
  const prompt = `
You are matching Google Drive file names to database titles.

Rules:
- Return ONLY valid JSON
- Do NOT explain anything
- If no match, return null

File name:
"${fileName}"

Available titles:
${titles.join("\n")}

JSON format:
{ "matchedTitle": "exact title from list or null" }
`;

  const response = await axios.post(
    GEMINI_URL,
    {
      contents: [{ parts: [{ text: prompt }] }]
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );

  const text =
    response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  const json = extractJSON(text);
  return json?.matchedTitle || null;
}

/* ----------------------------------
   MAIN EXPORT
---------------------------------- */

exports.matchTitleWithAI = async (fileName, titles) => {
  // 1️⃣ Try regex first
  const regexMatch = await regexMatchTitle(fileName, titles);
  if (regexMatch) {
    return {
      matchedTitle: regexMatch,
      method: "regex"
    };
  }

  // 2️⃣ Fallback to AI
  const aiMatch = await aiMatchTitle(fileName, titles);

  // Avoid hammering Gemini (429 protection)
  await new Promise((r) => setTimeout(r, 1200));

  if (aiMatch) {
    return {
      matchedTitle: aiMatch,
      method: "ai"
    };
  }

  return {
    matchedTitle: null,
    method: "none"
  };
};
