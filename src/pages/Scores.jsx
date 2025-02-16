import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import "./Scores.css";

function Scores() {
  const [score, setScore] = useState("");
  const [scores, setScores] = useState([]);

  // Fetch scores from Firestore, ordered by timestamp descending.
  useEffect(() => {
    const scoresQuery = query(collection(db, "scores"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(scoresQuery, (snapshot) => {
      const scoresArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setScores(scoresArray);
    });
    return unsubscribe;
  }, []);

  // Handle form submission to add a new score
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!score) return;
    try {
      await addDoc(collection(db, "scores"), {
        score: parseFloat(score),
        timestamp: serverTimestamp(),
      });
      setScore("");
    } catch (error) {
      console.error("Error adding score: ", error);
    }
  };

  return (
    <div className="scores-container">
      <h1 className="page-title">🏌️ Scores & Handicaps</h1>
      <form onSubmit={handleSubmit} className="score-form">
        <input 
          type="number" 
          value={score} 
          onChange={(e) => setScore(e.target.value)} 
          placeholder="Enter your score"
          required
        />
        <button type="submit">Submit Score</button>
      </form>
      <div className="scores-list">
        {scores.map((item) => (
          <div key={item.id} className="score-item">
            <p>Score: {item.score}</p>
            <p>Date: {item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleString() : "Just now"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scores;
