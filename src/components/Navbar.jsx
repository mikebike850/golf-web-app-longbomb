import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import styles

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">🏌️‍♂️ Long Bomb Cup</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/scores">Scores</Link></li>
        <li><Link to="/challenges">Challenges</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
