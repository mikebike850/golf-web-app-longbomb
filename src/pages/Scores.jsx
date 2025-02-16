import React, { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import "./Scores.css";

function Scores() {
  const { currentUser } = useAuth();
  const [score, setScore] = useState("");
  const [par, setPar] = useState("");
  const [scores, setScores] = useState([]);
  const [handicap, setHandicap] = useState(null);

  // Fetch scores for the current user from Firestore
  useEffect(() => {
    if (currentUser) {
      const scoresQuery = query(
        collection(db, "scores"),
        where("userId", "==", currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const unsubscribe = onSnapshot(
        scoresQuery,
        (snapshot) => {
          const scoresArray = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));
          setScores(scoresArray);
        },
        (error) => {
          console.error("Error fetching scores:", error);
        }
      );
      return unsubscribe;
    }
  }, [currentUser]);

  // Handle submission of a new score
  const handleScoreSubmit = async (e) => {
    e.preventDefault();
    if (!score || !par) return;
    try {
      await addDoc(collection(db, "scores"), {
        userId: currentUser.uid,
        score: parseFloat(score),
        par: parseFloat(par),
        timestamp: serverTimestamp(),
      });
      setScore("");
      setPar("");
    } catch (error) {
      console.error("Error adding score:", error);
    }
  };

  // Automatically calculate handicap when scores update and update user's profile
  useEffect(() => {
    if (scores.length === 0) {
      setHandicap(null);
      return;
    }
    // Calculate handicap using the differences (score - par)
    const differences = scores.map((item) => item.score - item.par);
    const avgDiff = differences.reduce((a, b) => a + b, 0) / differences.length;
    const calcHandicap = avgDiff * 0.8; // Adjust this factor as needed
    const newHandicap = calcHandicap.toFixed(2);
    setHandicap(newHandicap);

    // Update user's Handicap in Firestore
    const updateUserHandicap = async () => {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, { Handicap: newHandicap });
      } catch (error) {
        console.error("Error updating user's handicap:", error);
      }
    };

    updateUserHandicap();
  }, [scores, currentUser]);

  return (
    <div className="scores-container">
      <h1 className="page-title">🏌️ Scores & Handicap</h1>

      {/* Score Submission Section */}
      <form onSubmit={handleScoreSubmit} className="score-form">
        <input 
          type="number" 
          value={score} 
          onChange={(e) => setScore(e.target.value)} 
          placeholder="Enter your score" 
          required
        />
        <input 
          type="number" 
          value={par} 
          onChange={(e) => setPar(e.target.value)} 
          placeholder="Enter course par" 
          required
        />
        <button type="submit">Submit Score</button>
      </form>

      {/* Display Submitted Scores */}
      <div className="scores-list">
        {scores.map((item) => (
          <div key={item.id} className="score-item">
            <p>Score: {item.score}</p>
            <p>Par: {item.par}</p>
            <p>Date: {item.timestamp ? new Date(item.timestamp.seconds * 1000).toLocaleString() : "Just now"}</p>
          </div>
        ))}
      </div>

      {/* Display Calculated Handicap */}
      {handicap !== null && (
        <div className="handicap-result">
          <p>Your calculated handicap is: {handicap}</p>
        </div>
      )}
    </div>
  );
}

export default Scores;
