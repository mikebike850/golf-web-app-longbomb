import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import CountdownWidget from "./CountdownWidget";
import WeatherWidget from "./WeatherWidget";
import "./Layout.css";

function Layout() {
  return (
    <div>
      <Navbar />
      <CountdownWidget />
      <WeatherWidget />
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
