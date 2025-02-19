import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import CountdownWidget from "./CountdownWidget";
import WeatherWidget from "./WeatherWidget";
import BackgroundCarousel from "./BackgroundCarousel"; // Import the carousel component
import "./Layout.css";

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="carousel">
        <BackgroundCarousel /> {/* Use the imported carousel component */}
      </div>
      <div className="widgets-container">
        <CountdownWidget />
        <WeatherWidget />
      </div>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;