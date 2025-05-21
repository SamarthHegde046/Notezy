import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import logo from './favicon.png';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { isAdmin, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully!');
    setMenuOpen(false); // close menu on logout
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="StudyNotes Logo" className="logo-img" />
        </Link>
        <Link to="/" className="brand-name" onClick={closeMenu}>NoteBuddy</Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </li>

        {!isAdmin ? (
          <>
            <li><Link to="https://results.vtu.ac.in/" onClick={closeMenu}>vtu results</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard123" onClick={closeMenu}>Dashboard</Link></li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
