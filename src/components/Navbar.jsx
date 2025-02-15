import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">🏌️‍♂️ Long Bomb Cup</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/scores">Scores</Link>
        <Link to="/challenges">Challenges</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
