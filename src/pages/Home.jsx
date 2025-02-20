import React from "react";
import MessageBoard from "../components/MessageBoard";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-top">
        {/* BackgroundCarousel is now in Layout.jsx */}
      </div>
      <div className="home-bottom">
        <MessageBoard />
      </div>
    </div>
  );
}

export default Home;