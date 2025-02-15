import React, { useState } from "react";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./../components/Auth.css"; // Ensures correct styling

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset previous errors

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile"); // Redirect to profile after login
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{" "}
        <span className="auth-link" onClick={() => navigate("/signup")}>
          Sign Up
        </span>
      </p>
      <p>
        Forgot your password?{" "}
        <span className="auth-link" onClick={() => navigate("/reset-password")}>
          Reset Password
        </span>
      </p>
    </div>
  );
}

export default Login;
