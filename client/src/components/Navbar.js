import React, { useContext, useState } from 'react';
import './componentsStyle.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="left">
        <a href="/" className="logo">
          <img src="/images/logo.png" alt="NextSphere Logo" />
          <span>NextSphere</span>
        </a>
      </div>

      {/* Center Section - Navigation Links */}
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/List">Property</a>
        <a href="/contact">Contacts</a>
        {!currentUser ? (
          <div className="userProfile">
            <Link to="/login" className="auth-button btn">Sign In</Link>
            <Link to="/register" className="auth-button btn">Sign Up</Link>
          </div>
        ) : (
          <div className="userProfile">
            <img src={currentUser.avatar || 'images/user.jpg'} alt="" />
            <p>{currentUser.username || 'No User Name'}</p>
            <button className="profile-button">
              <Link to="/profile" className="profile-link btn">Profile</Link>
            </button>
          </div>
        )}
      </div>


      {/* <div className={`auth-section ${menuOpen ? 'open' : ''}`}>
        
      </div> */}

    
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
