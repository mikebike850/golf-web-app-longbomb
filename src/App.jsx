import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function Home() {
  return <h1>🏡 Home Page - Welcome to The Long Bomb Cup Web App</h1>;
}

function Scores() {
  return <h1>⛳ Scores Page - Track Your Golf Scores</h1>;
}

function Challenges() {
  return <h1>🏆 Challenges Page - Compete with Friends</h1>;
}

function Profile() {
  return <h1>👤 Profile Page - View & Edit Your Profile</h1>;
}

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Footer />  {/* Add Footer here */}
    </div>
  );
}

export default App;
