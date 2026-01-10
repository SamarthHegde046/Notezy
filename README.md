# Notezy - VTU Notes Sharing Platform 📚

<div align="center">

![Notezy Logo](public/feather-pen.png)

**A student-first platform for accessing and sharing VTU CBCS 2022 scheme academic notes**

[Live Demo](https://notezy.online) | [Report Bug](https://github.com/SamarthHegde046/Notezy/issues) | [Request Feature](https://github.com/SamarthHegde046/Notezy/issues)

</div>

---

## 📖 About Notezy

**Notezy** is a comprehensive platform designed to simplify access to high-quality VTU (Visvesvaraya Technological University) CBCS 2022 scheme academic notes, making learning more organized, stress-free, and collaborative. Built by students, for students.

### The Story

It all started with a simple frustration — endlessly searching for reliable notes before exams. Students spend hours looking through multiple WhatsApp or Telegram groups just to find one PDF. That's when Notezy was born, a one-stop platform to store, search, and share all academic notes easily.

Today, Notezy is not just a repository of notes, but a **growing community of learners** who believe in helping each other succeed.

---

## ✨ Key Features

### 📝 Comprehensive Study Materials
- **Complete VTU Notes**: Access notes for all VTU subjects across different departments
- **Previous Year Question Papers**: Download question papers with solutions
- **Department-wise Organization**: Notes organized by departments (CSE, AIML, ECE, etc.)
- **Semester-wise Navigation**: Easy navigation through different semesters

### 🤖 AI-Powered Tools
- **Notezy AI Chatbot**: AI-powered PDF analyzer and smart study companion
- **Book Extractor & Explainer**: Upload PDFs and get intelligent explanations
- **Interactive Q&A**: Ask questions about your study materials and get instant answers

### 🎯 SGPA/CGPA Calculator
- **Accurate Grade Calculation**: Calculate your semester and cumulative GPA
- **VTU-specific**: Tailored for VTU CBCS 2022 scheme grading system
- **Multiple Streams Support**: CSE, ECE, AIML, and more
- **PDF Upload**: Upload marksheets for automatic grade extraction

### 🔍 Smart Search
- **Fast Navigation**: Find exactly what you need in seconds
- **Easy Access**: Simple and intuitive interface
- **Preview & Download**: Preview notes before downloading

### 🤝 Community Contributions
- **Upload Notes**: Share your study materials with fellow students
- **Blog Section**: Read and share educational content
- **Feedback System**: Help improve the platform

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - UI library
- **React Router DOM 7.6.0** - Navigation and routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library
- **React Toastify** - Notifications
- **Recharts** - Data visualization
- **React Helmet** - SEO optimization
- **PDF.js** - PDF parsing and rendering

### Backend
- **Node.js** - Server runtime
- **Express** - Backend API framework (separate repository)
- **MongoDB** - Database for storing notes and user data

### AI Integration
- **Google Generative AI** - Powers the AI chatbot and PDF analysis features

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SamarthHegde046/Notezy.git
   cd Notezy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_BASE=https://notes-app-backend-xdrc.onrender.com/api
   ```
   
   Or for local backend development:
   ```env
   REACT_APP_API_BASE=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. The build is optimized for best performance.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

This command will remove the single build dependency and copy all configuration files into your project.

---

## 📁 Project Structure

```
Notezy/
├── public/
│   ├── index.html
│   ├── feather-pen.png
│   └── ...
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── Notezybot.js    # AI Chatbot component
│   │   ├── NoteCard.js
│   │   ├── PDFUploader.js
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Home.js
│   │   ├── DepartmentPage.js
│   │   ├── SemPage.js
│   │   ├── MainCalculator.js
│   │   ├── Blogs.js
│   │   ├── AboutUs.js
│   │   └── ...
│   ├── services/            # API and utility services
│   │   ├── api.js           # API calls
│   │   ├── calculator.js    # SGPA/CGPA calculations
│   │   ├── pdfParser.js     # PDF parsing utilities
│   │   └── geminiforsgpa.js # AI integration
│   ├── context/             # React Context providers
│   │   └── ThemeContext.js
│   ├── App.js               # Main application component
│   ├── index.js             # Application entry point
│   └── ...
├── .env                     # Environment variables
├── package.json
└── README.md
```

---

## 🌐 Environment Variables

The following environment variables are required:

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_BASE` | Backend API base URL | `https://notes-app-backend-xdrc.onrender.com/api` |

---

## 🎨 Features in Detail

### Note Management
- Browse notes by department and semester
- Preview notes before downloading
- Search functionality for quick access
- Admin dashboard for managing notes

### SGPA/CGPA Calculator
- Support for VTU CBCS 2022 scheme
- Multiple department support (CSE, ECE, AIML, etc.)
- Automatic credit calculation
- PDF marksheet upload with AI extraction
- Percentage conversion

### AI Chatbot (Notezy AI)
- PDF upload and analysis
- Context-aware Q&A about uploaded documents
- Markdown support for formatted responses
- Session-based conversations

### Blog Platform
- Educational blog posts
- SEO optimized content
- Social media sharing integration
- Comment and engagement features

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contributing Guidelines

- Write clean, maintainable code
- Follow the existing code style
- Test your changes thoroughly
- Update documentation as needed
- Be respectful and collaborative

### Share Your Notes

Want to contribute study materials? Use our [note submission form](https://forms.gle/nd7wsDjrxv8fyh11A) to share your notes with the community!

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Contact & Support

- **Website**: [notezy.online](https://notezy.online)
- **GitHub**: [@SamarthHegde046](https://github.com/SamarthHegde046)
- **Issues**: [GitHub Issues](https://github.com/SamarthHegde046/Notezy/issues)

For questions, suggestions, or feedback, feel free to reach out through our platform or create an issue on GitHub.

---

## 🙏 Acknowledgments

- Built with ❤️ by students, for students
- Powered by [Create React App](https://github.com/facebook/create-react-app)
- AI capabilities by [Google Generative AI](https://ai.google.dev/)
- Icons by [Lucide React](https://lucide.dev/)
- VTU community for continuous support and feedback

---

## 🌟 Show Your Support

If you find Notezy helpful, please consider:
- ⭐ Starring this repository
- 🐛 Reporting bugs and issues
- 💡 Suggesting new features
- 📝 Contributing notes and content
- 🔄 Sharing with your fellow students

---

<div align="center">

**Made with 💙 for the VTU Student Community**

</div>
