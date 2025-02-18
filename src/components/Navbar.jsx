import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/scores">Scores</Link></li>
        <li className="navbar-item"><Link to="/challenges">Challenges</Link></li>
        <li className="navbar-item"><Link to="/profile">Profile</Link></li>
        <li className="navbar-item"><Link to="/login">Login</Link></li>
        <li className="navbar-item"><Link to="/signup">Sign Up</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;