import React from "react";
import "./Home.css"; // Ensure this file exists!

function Home() {
  return (
    <div className="home-container">
      {/* 🔹 DEBUG: Force text to appear */}
      <h1>Welcome to The Long Bomb Cup Web App</h1>
      <p>
        This is the central hub for everything related to our golf trip! Track scores,
        challenge friends, and stay updated with the latest event info.
      </p>

      {/* 🔹 Add Some Buttons for Navigation */}
      <div className="home-buttons">
        <button onClick={() => (window.location.href = "/scores")}>View Scores</button>
        <button onClick={() => (window.location.href = "/challenges")}>View Challenges</button>
      </div>
    </div>
  );
}

export default Home;
