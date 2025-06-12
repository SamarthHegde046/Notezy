const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const contactRoutes = require('./routes/contact');

const uploadRoute = require("./routes/uploadRoute");
const chatRoute = require("./routes/chatRoute");
const sessionRoute = require("./routes/sessionRoute");
const analyzeRoute = require("./routes/analyzeRoute");


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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/", uploadRoute);
app.use("/api/", chatRoute);
app.use("/api/", sessionRoute);
app.use("/api/", analyzeRoute);

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
