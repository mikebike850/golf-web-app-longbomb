import React from 'react';
import './Footer.css'; // Import CSS for styling

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} The Long Bomb Cup - All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
