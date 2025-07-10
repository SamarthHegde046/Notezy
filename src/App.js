import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import SemPage from './pages/SemPage'
import { SEM_OPTIONS } from './components/sems';
import DepartmentPage from './pages/DepartmentPage';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { useEffect } from 'react';


import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import NoteCard from './components/NoteCard';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AboutUs from './pages/AboutUs';
import TermsConditions from './pages/TermsConditions';
import Notezybot from './components/Notezybot';
import NotesChatbot from './components/NotesChatbot';
import ChannelJoinBanner from './components/ChannelJoinBanner';
import BlogDetails from './pages/BlogDetails';
import Blogs from './pages/Blogs';


function App() {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/visit`, { method: 'POST' });
  }, []);
  return (
    <ThemeProvider>
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login2005" element={<Login />} />
            <Route path="/register2005" element={<Register />} />
            
            {/* Protected routes */}
            <Route
              path="/dashboard123"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/note/:id" element={<NoteCard />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path='/notezybot' element={<Notezybot/>}/>
            <Route path='/quicknotes' element={<NotesChatbot/>}/>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />


            {SEM_OPTIONS.map(option => (
              <Route
                key={option.value}
                path={`/${option.value}`}
                element={<SemPage />}
              />
            ))}
            <Route path="/:sem/:department" element={<DepartmentPage/>} />
          </Routes>
          <ToastContainer position="bottom-right" autoClose={1000} pauseOnHover />&nbsp;
          <ChannelJoinBanner/>&nbsp;
          <Footer />
        </main>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
