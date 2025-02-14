import React, { useState } from "react";
import { auth } from "../config/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import "./Auth.css";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your email for password reset instructions.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Reset Your Password</h2>
      <div className="form-container">
        {message && <p>{message}</p>}
        <form onSubmit={handlePasswordReset}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default PasswordReset;

