import React, { useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User created:", user.uid); // Debugging log

      // Store user in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email: user.email,
        handicap: null, // Default value
        createdAt: new Date(),
      });

      console.log("User successfully stored in Firestore"); // Debugging log

      alert("User signed up successfully!");
      navigate("/profile"); // Redirect to profile page after signup
    } catch (err) {
      console.error("Error signing up:", err);
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Create Your Account</h2>
      <div className="form-container">
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
