import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Scores from "./pages/Scores";
import Challenges from "./pages/Challenges";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Countdown from "./components/CountdownWidget"; // Ensure this path is correct
import WeatherWidget from "./components/WeatherWidget"; // Ensure this path is correct

function App() {
  return (
    <div className="app">
      <Countdown />
      <WeatherWidget />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;