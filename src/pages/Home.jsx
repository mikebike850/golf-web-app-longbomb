import React from "react";
import "./Home.css";
import WeatherWidget from "../components/WeatherWidget";
import MessageBoard from "../components/MessageBoard"; // if you have one

function Home() {
  return (
    <div className="home-container">
      <h1 className="page-title">🏡 Welcome to The Long Bomb Cup Web App</h1>
      <p>
        This is your central hub for our annual golf trip! Here you can view the countdown to our next outing,
        check the latest scores and challenges, and connect with fellow participants.
      </p>
      {/* Weather Widget */}
      <WeatherWidget />
      {/* Message Board (if you have one) */}
      <MessageBoard />
    </div>
  );
}

export default Home;
