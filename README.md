# 📚 Notezy - VTU Notes Sharing Platform

![Notezy Logo](public/feather-pen.png)

**Notezy** is a student-driven platform designed to make VTU (Visvesvaraya Technological University) study materials accessible to everyone. Built by students, for students, Notezy provides a simple and secure platform for downloading and sharing VTU CBCS 2022 scheme academic notes, question papers, and study materials.

🌐 **Live Website**: [notezy.online](https://notezy.online)

---

## ✨ Features

- 📖 **Comprehensive Notes**: Complete study materials for all VTU subjects across multiple departments
- 📝 **Question Papers**: Previous year papers with solutions for exam preparation
- 🔍 **Easy Search**: Find exactly what you need in seconds with intuitive navigation
- 🤖 **Notezy Bot**: AI-powered chatbot for instant help and guidance
- 💬 **Quick Notes**: Interactive notes chat feature powered by Google's Generative AI
- 📊 **SGPA & CGPA Calculator**: Calculate your grades for VTU 2022 scheme
- 📱 **Responsive Design**: Works seamlessly across all devices
- 🌙 **Dark Mode Support**: Theme toggle for comfortable reading
- 📤 **Upload Notes**: Contribute your own study materials to help fellow students
- 📰 **Blogs**: Educational content and resources for students
- 🔒 **Admin Dashboard**: Secure admin panel for content management
- 🔔 **Feedback System**: Share your thoughts and help improve the platform
- 📢 **WhatsApp Community**: Join the community for updates and discussions

---

## 🛠️ Technologies Used

### Frontend
- **React** (v19.1.0) - UI library
- **React Router** (v7.6.0) - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications
- **Lucide React** - Modern icon library
- **React Icons** - Additional icon support
- **Recharts** - Data visualization for admin dashboard
- **React Helmet** - SEO management
- **React Share** - Social media sharing capabilities
- **PDF.js** - PDF rendering and preview
- **JWT Decode** - Authentication token handling
- **Google Generative AI** - AI chatbot functionality

### Styling
- CSS3 with custom styling
- Responsive design principles
- Theme support (Light/Dark mode)

### Tools & Services
- **Create React App** - Project scaffolding
- **Google Analytics** - Usage tracking
- **Google AdSense** - Monetization
- Backend API hosted at: `https://notes-app-backend-xdrc.onrender.com/api`

---

## 📁 Project Structure

```
Notezy/
├── public/                  # Static files
│   ├── index.html          # HTML template
│   ├── feather-pen.png     # App logo
│   ├── manifest.json       # PWA manifest
│   ├── robots.txt          # SEO configuration
│   └── sitemap_notezy.xml  # Sitemap for search engines
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Navbar.js       # Navigation bar
│   │   ├── Footer.js       # Footer component
│   │   ├── NoteCard.js     # Note display card
│   │   ├── Notezybot.js    # AI chatbot
│   │   ├── NotesChatbot.js # Quick notes chat
│   │   ├── OptionsDropdown.js
│   │   ├── SearchFilter.js
│   │   ├── PDFUploader.js
│   │   ├── FeedbackForm.js
│   │   └── ... (other components)
│   ├── pages/              # Page components
│   │   ├── Home.js         # Landing page
│   │   ├── Login.js        # Admin login
│   │   ├── Register.js     # Admin registration
│   │   ├── AdminDashboard.js # Admin panel
│   │   ├── SemPage.js      # Semester page
│   │   ├── DepartmentPage.js # Department notes
│   │   ├── AboutUs.js      # About page
│   │   ├── PrivacyPolicy.js
│   │   ├── TermsConditions.js
│   │   ├── Blogs.js        # Blog listing
│   │   ├── BlogDetails.js  # Individual blog
│   │   └── Navcalculator.js # SGPA/CGPA calculator
│   ├── context/            # React Context
│   │   └── ThemeContext.js # Theme management
│   ├── services/           # API service layer
│   ├── App.js              # Main App component
│   ├── App.css             # App styling
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- Git

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

4. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.

---

## 🎯 Usage

### For Students
1. **Browse Notes**: Navigate to your semester and department to find relevant notes
2. **Download Materials**: Preview and download PDF notes and question papers
3. **Use Notezy Bot**: Get instant help with academic queries
4. **Calculate Grades**: Use the SGPA/CGPA calculator for VTU 2022 scheme
5. **Share Feedback**: Help improve the platform by providing feedback
6. **Contribute**: Upload your own notes using the contribution form

### For Admins
1. **Login**: Access the admin panel at `/login2005`
2. **Dashboard**: View statistics and manage content at `/dashboard123`
3. **Upload Content**: Add new notes, question papers, and materials
4. **Manage Users**: Monitor platform usage and user activity
5. **Review Feedback**: Read and respond to student feedback

---

## 🌟 Key Features Explained

### AI-Powered Features
- **Notezy Bot**: Uses Google's Generative AI to answer student queries and provide study guidance
- **Quick Notes**: Interactive chat feature for quick note-taking and Q&A

### SGPA/CGPA Calculator
- Supports VTU 2022 scheme
- Easy-to-use interface for grade calculation
- Saves calculation history

### Department & Semester Navigation
Supports multiple departments:
- Computer Science & Engineering (CSE)
- Artificial Intelligence & Machine Learning (AIML)
- Electronics & Communication Engineering (ECE)
- Information Science & Engineering (ISE)
- And more...

### SEO Optimized
- Proper meta tags for search engines
- Sitemap for better indexing
- Structured data markup
- Open Graph and Twitter Card support

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute
1. **Upload Notes**: Share your study materials via the upload form
2. **Report Bugs**: Create an issue on GitHub
3. **Suggest Features**: Share your ideas for improvements
4. **Code Contributions**: Submit pull requests for bug fixes or new features
5. **Documentation**: Help improve documentation

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🔒 Privacy & Security

- User data is handled securely
- JWT-based authentication for admin access
- Protected routes for sensitive operations
- Compliance with privacy regulations
- Read our [Privacy Policy](https://notezy.online/privacy-policy) for details

---

## 📞 Contact & Support

- **Website**: [notezy.online](https://notezy.online)
- **WhatsApp Community**: Join via the banner on the website
- **GitHub**: [SamarthHegde046/Notezy](https://github.com/SamarthHegde046/Notezy)
- **Feedback**: Use the in-app feedback form

---

## 📄 License

This project is maintained by students for educational purposes. All study materials are shared with the intention of helping fellow VTU students.

---

## 🙏 Acknowledgments

- All students who have contributed notes and materials
- VTU for the academic curriculum
- The open-source community for amazing tools and libraries
- Contributors and maintainers of this project

---

## 🚀 Deployment

The application is deployed and accessible at [notezy.online](https://notezy.online)

To deploy your own instance:
1. Build the production bundle: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Ensure environment variables are properly configured
4. Set up backend API connection

---

## 📈 Future Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced search with filters
- [ ] User accounts for students
- [ ] Bookmarking and favorites
- [ ] Collaborative study groups
- [ ] Video tutorials integration
- [ ] Exam countdown timer
- [ ] Notes rating system
- [ ] Offline mode support

---

## ⭐ Show Your Support

If you find Notezy helpful, please consider:
- ⭐ Starring the repository
- 📢 Sharing with fellow students
- 🤝 Contributing notes and materials
- 💬 Providing feedback

---

**Made with ❤️ by students, for students**

*Last Updated: January 2026*
