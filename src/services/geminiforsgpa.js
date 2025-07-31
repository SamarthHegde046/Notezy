import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyABhaazjIdUWir72wn_wNaZKvttmMyCqxA");

export async function extractSubjectMarksFromText(pdfText) {
  const prompt = `
Given the following VTU result text, do two things:
1. Extract subject codes and total marks in this format:
   "subjects": [
     { "code": "BCS401", "marks": 85 },
     ...
   ]
2. Detect the semester number from the text (like 3rd, 4th etc). Only return the number in the format: "semester": 3

Return the result in this JSON structure:
{
  "semester": <number>,
  "subjects": [
    { "code": "...", "marks": ... },
    ...
  ]
}

Here is the text:
${pdfText}
`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  const response = result.response.text();

  try {
    const jsonStart = response.indexOf('{');
    const jsonEnd = response.lastIndexOf('}');
    const jsonString = response.substring(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("❌ Failed to parse Gemini response:", err);
    return { semester: null, subjects: [] };
  }
}
