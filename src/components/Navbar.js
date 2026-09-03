import React, { useContext, useState, useRef, useEffect } from 'react';
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

  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully!');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // ✅ Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen && 
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        hamburgerRef.current && 
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu} className="logo-link">
            <img src={logo} alt="StudyNotes Logo" className="logo-img" />
            <span className="brand-name">Notezy</span>
          </Link>
        </div>

        {/* Desktop Menu */}
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
                  <Link to="/" onClick={closeMenu} className="nav-link">Home</Link>
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
                  <Link to="/dashboard123" onClick={closeMenu} className="nav-link dashboard-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="logout-btn" onClick={handleLogout}>
                    <span>Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Controls */}
        <div className="mobile-controls">
          <button onClick={toggleTheme} className="theme-toggle-btn mobile-theme-btn" title="Toggle theme">
            <span className="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
          </button>

          {/* Hamburger Menu */}
          <div 
            ref={hamburgerRef}
            className={`hamburger ${menuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div ref={menuRef} className={`navbar-menu mobile-menu ${menuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            {!isAdmin ? (
              <>
                <li className="nav-item">
                  <Link to="/" onClick={closeMenu} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="https://results.vtu.ac.in/" onClick={closeMenu} className="nav-link external-link">
                    <span>VTU Results</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/quicknotes" onClick={closeMenu} className="nav-link">
                    <span>Quick Notes</span>
                    <span className="new-badge">NEW</span>
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
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/dashboard123" onClick={closeMenu} className="nav-link dashboard-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="logout-btn" onClick={handleLogout}>
                    <span>Logout</span>
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
