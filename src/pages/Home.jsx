import React from "react";
import "./Home.css";
import BackgroundCarousel from "../components/BackgroundCarousel";
import CountdownWidget from "../components/CountdownWidget";
import WeatherWidget from "../components/WeatherWidget";
import MessageBoard from "../components/MessageBoard";

function Home() {
  return (
    <div className="home-page">
      <div className="home-top">
        {/* Background carousel */}
        <BackgroundCarousel />
        {/* Description overlay with trip updates */}
        <div className="home-description">
          <h2>Trip Updates & Announcements</h2>
          <p>
            Welcome to The Long Bomb Cup! Stay tuned for the latest updates, schedule changes, and special announcements.
          </p>
        </div>
        {/* Widgets overlaid on the background */}
        <CountdownWidget />
        <WeatherWidget />
      </div>
      <div className="home-bottom">
        <MessageBoard />
      </div>
    </div>
  );
}

export default Home;
