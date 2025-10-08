const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const contactRoutes = require('./routes/contact');

const chatRoute = require("./routes/chatRoute");
const sessionRoute = require("./routes/sessionRoute");
const analyzeRoute = require("./routes/analyzeRoute");
const feedbackRoute= require("./routes/feedbackRoute");
const visitorRoute = require('./routes/visitorRoute');
const blogRoutes = require("./routes/blogRoutes");


const { cleanupOldSessions } = require("./utils/sessionManager");

setInterval(() => {
  cleanupOldSessions();
}, 60 * 60 * 1000);

// Load .env only in dev
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware
app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const GEMINI_API_KEY = 'AIzaSyB0PG_S3DUIPYppTS790sfkxb-pZAyOaqg'; 
app.post('/api/gemini-chat', async (req, res) => {
  const userInput = req.body.message;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
You are a JSON-generating assistant for a note-sharing app. Given a user query, extract structured info.

Extract:
- "subject": Full subject name (like "Database Management System")
- "code": Subject code (like "BCS403")
- "module": Module number if mentioned (just number like "1", optional)
- "title": Full title if mentioned (like "Module 2" or "MQP 1/2 - BCS403", optional)
- "type": "module" | "qp" or "question papers" | "all" — "module" if user asks for module notes, "qp" or "question paper(s)" or "Question Paper(s)" for question papers, otherwise "all".

If the user just says hi, hello, bye, etc., respond with:
{
  "response": "Hi there! How can I help you today?"
}
  
If the user is just being friendly (e.g., “tq”,"tqnx", “thank you”,"thank u"), reply with:
{
  "response": "You're welcome!" 
}
If user asks about the bot (e.g., "who are you", "what can you do"):
{
  "response": "I'm your smart notes assistant! Ask me for any subject notes, modules, or question papers."
}
 If user asks how many notes you have:
{
  "response": "I have plenty of notes across various subjects — just tell me what you need!"
}
- Accept short forms:
  - ada → Analysis and Design of Algorithms
  - dsa → Data Structures and Applications
  - ai → Artificial Intelligence
  - bio, biology → Biology for Engineers
  - cs → Control Systems
  -dbms->Database Management System
  -uhv->Universal Human Values
  - Do NOT include explanations.
Return ONLY clean JSON. No markdown, no triple backticks. Strictly valid JSON.

User input:
"${userInput}"
    `.trim()
             }
            ]
          }
        ]
      }
    );

    const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

    // Validate JSON
    try {
      const parsed = JSON.parse(botReply);
      res.json(parsed);
    } catch (jsonErr) {
      res.status(400).json({ error: 'Invalid response format from Gemini.' });
    }

  } catch (err) {
    console.error('Gemini API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Gemini request failed.' });
  }
});
//Routes

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/", chatRoute);
app.use("/api/", sessionRoute);
app.use("/api/", analyzeRoute);
app.use('/api', visitorRoute);
app.use("/api/feedback",feedbackRoute);
app.use("/api/blogs", blogRoutes);

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
