import React from "react";
import "./Home.css";
import BackgroundCarousel from "../components/BackgroundCarousel";
import MessageBoard from "../components/MessageBoard";

// Note: For the home page, the countdown and weather will come from the Layout (shared on every page).
// The home page content can include the background carousel, description, and message board.

function Home() {
  return (
    <div className="home-page">
      <div className="home-top">
        <BackgroundCarousel />
        <div className="home-description">
          <h2>Trip Updates & Announcements</h2>
          <p>
            Welcome to The Long Bomb Cup! Stay tuned for the latest updates, schedule changes,
            and special announcements regarding our annual golf trip.
          </p>
        </div>
      </div>
      <div className="home-bottom">
        <MessageBoard />
      </div>
    </div>
  );
}

export default Home;
