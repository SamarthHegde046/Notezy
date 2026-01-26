import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBApsyjm4wIZMRq_uFM5Ix3_9_BM20_Fyc");

export async function extractSubjectMarksFromText(pdfText) {
  const prompt = `
You are a JSON API.

Extract VTU result data.

Rules:
- Output ONLY valid JSON
- No markdown
- No explanation

JSON:
{
  "semester": number | null,
  "subjects": [
    { "code": string, "marks": number }
  ]
}

Text:
${pdfText}
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const parsed = safeParseJSON(responseText);

    if (!parsed || !parsed.subjects) {
      throw new Error("Invalid Gemini JSON");
    }

    return parsed;
  } catch (error) {
    console.error("❌ Gemini parsing failed:", error);
    return { semester: null, subjects: [] };
  }
}

// helper
function safeParseJSON(text) {
  try {
    const cleaned = text
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) return null;

    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}
