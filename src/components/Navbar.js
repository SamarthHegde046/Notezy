import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import logo from './feather-pen.png';
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
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu} className="logo-link">
            <img src={logo} alt="StudyNotes Logo" className="logo-img" />
            <span className="brand-name">Notezy</span>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="navbar-menu desktop-menu">
          <ul className="navbar-links">
            <li className="nav-item">
              <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle theme">
                <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
              </button>
            </li>

            {!isAdmin ? (
              <>
                <li className="nav-item">
                  <Link to="/" onClick={closeMenu} className="nav-link">
                    <span>Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="https://results.vtu.ac.in/" onClick={closeMenu} className="nav-link external-link">
                    <span>VTU Results</span>
                    <svg className="external-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15,3 21,3 21,9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/notezybot" onClick={closeMenu} className="nav-link ai-link">
                    <span>Notezy AI</span>
                    <div className="ai-sparkle">✨</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/quicknotes" onClick={closeMenu} className="nav-link ai-link">
                    <span>Quick Notes</span>
                    <span className="new-badge">NEW</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/sgpa-and-cgpa-calculator-2022-scheme" onClick={closeMenu} className="nav-link ai-link">
                    <span>SGPA&CGPA Calculator</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/dashboard123" onClick={closeMenu} className="nav-link dashboard-link">
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="logout-btn" onClick={handleLogout}>
                    <span>Logout</span>
                    <svg className="logout-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16,17 21,12 16,7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile controls */}
        <div className="mobile-controls">
          <button onClick={toggleTheme} className="theme-toggle-btn mobile-theme-btn" title="Toggle theme">
            <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
          </button>
          
          <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div className={`navbar-menu mobile-menu ${menuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            {!isAdmin ? (
              <>
                <li className="nav-item">
                  <Link to="/" onClick={closeMenu} className="nav-link">
                    <span>Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="https://results.vtu.ac.in/" onClick={closeMenu} className="nav-link external-link">
                    <span>VTU Results</span>
                    <svg className="external-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15,3 21,3 21,9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/quicknotes" onClick={closeMenu} className="nav-link ">
                    <span>Quick Notes</span>
                    <span className="new-badge">NEW</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/notezybot" onClick={closeMenu} className="nav-link ai-link">
                    <span>Notezy AI</span>
                    <div className="ai-sparkle">✨</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="https://forms.gle/nd7wsDjrxv8fyh11A" onClick={closeMenu} className="nav-link ai-link">
                    <span>Upload Notes</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/sgpa-and-cgpa-calculator-2022-scheme" onClick={closeMenu} className="nav-link ai-link">
                    <span>SGPA&CGPA Calculator</span>
                    <span className="new-badge">NEW</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/blogs" onClick={closeMenu} className="nav-link ai-link">
                    <span>Blogs</span>
                    <span className="new-badge">NEW</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/dashboard123" onClick={closeMenu} className="nav-link dashboard-link">
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="logout-btn" onClick={handleLogout}>
                    <span>Logout</span>
                    <svg className="logout-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16,17 21,12 16,7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;