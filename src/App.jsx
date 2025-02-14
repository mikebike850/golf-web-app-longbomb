import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PasswordReset from "./components/PasswordReset";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";

function Home() {
  return <h1>🏡 Home Page - Welcome to The Long Bomb Cup Web App</h1>;
}

function Scores() {
  return <h1>⛳ Scores Page - Track Your Golf Scores</h1>;
}

function Challenges() {
  return <h1>🏆 Challenges Page - Compete with Friends</h1>;
}


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scores" element={<Scores />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordReset />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
