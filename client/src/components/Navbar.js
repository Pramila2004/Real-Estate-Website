import React, { useContext } from 'react';
import './componentsStyle.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
 

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="left">
        <a href="/" className="logo">
          <img src="/images/logo.png" alt="NextSphere Logo" />
          <span>NextSphere</span>
        </a>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/List">Property</a>
          <a href="/contact">Contacts</a>
        </div>
      </div>

      {/* Right Section */}
      <div className="auth">
        {!currentUser ? (
          <>
            <a href="/login" className="auth-link">Sign In</a>
            <a href="/register" className="auth-link">Sign Up</a>
          </>
        ) : (
          <div className="userProfile">
            <img src={currentUser.avatar || "images/user.jpg"} alt="User Profile" className="user-image" />
            <span>{currentUser.username}</span>
            <button>
            <Link to="/profile" className="profile">
              <span>Profile</span>
            </Link>
            </button>
           
          </div>
        )}
      </div>
    </nav>
  );
}
