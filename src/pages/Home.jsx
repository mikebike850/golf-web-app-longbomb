import React from "react";
import "./Home.css";
import MessageBoard from "../components/MessageBoard";

function Home() {
  return (
    <div className="home-container">
      <h1 className="page-title">🏡 Welcome to The Long Bomb Cup Web App</h1>
      <p>
        This is your central hub for our annual golf trip! View the countdown to our next outing,
        check scores and challenges, and connect with fellow participants.
      </p>
      {/* Message Board Section */}
      <MessageBoard />
    </div>
  );
}

export default Home;
