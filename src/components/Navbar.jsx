import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css"; // Ensure CSS is applied

function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-logo">🏌️‍♂️ Long Bomb Cup</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/scores">Scores</Link></li>
        <li><Link to="/challenges">Challenges</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        
        {!currentUser ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        ) : (
          <li>
            <button onClick={logout} className="logout-btn">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
