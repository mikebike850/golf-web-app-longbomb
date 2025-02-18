import React, { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import "./Scores.css";

function Scores() {
  const { currentUser } = useAuth();
  
  // State for current user's scores and calculated handicap
  const [myScores, setMyScores] = useState([]);
  const [myHandicap, setMyHandicap] = useState(null);

  // State for other users' latest scores and their handicaps
  const [otherScores, setOtherScores] = useState([]);  // Array of score objects from other users
  const [otherHandicaps, setOtherHandicaps] = useState({}); // Map: userId -> Handicap

  // --- Query current user's scores ---
  useEffect(() => {
    if (!currentUser) return;
    const myScoresQuery = query(
      collection(db, "scores"),
      where("userId", "==", currentUser.uid),
      orderBy("timestamp", "asc")
    );
    const unsubscribeMy = onSnapshot(myScoresQuery, (snapshot) => {
      const scoresArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMyScores(scoresArray);
      
      // Calculate handicap for current user if scores exist
      if (scoresArray.length > 0) {
        const differences = scoresArray.map((s) => s.score - s.par);
        const avgDiff = differences.reduce((a, b) => a + b, 0) / differences.length;
        const calculatedHandicap = (avgDiff * 0.8).toFixed(2);
        setMyHandicap(calculatedHandicap);
        // Update the user's document in "users" collection
        updateDoc(doc(db, "users", currentUser.uid), { Handicap: calculatedHandicap }).catch(console.error);
      } else {
        setMyHandicap(null);
      }
    });
    return () => unsubscribeMy();
  }, [currentUser]);

  // --- Query other users' scores ---
  useEffect(() => {
    if (!currentUser) return;
    // Note: Firestore requires ordering when using "!=" queries.
    // We'll order by userId first, then by timestamp descending.
    const otherScoresQuery = query(
      collection(db, "scores"),
      where("userId", "!=", currentUser.uid),
      orderBy("userId"),
      orderBy("timestamp", "desc")
    );
    const unsubscribeOther = onSnapshot(otherScoresQuery, (snapshot) => {
      const allScores = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Group by userId: for each other user, take the first (latest) entry.
      const grouped = {};
      allScores.forEach((score) => {
        if (!grouped[score.userId]) {
          grouped[score.userId] = score;
        }
      });
      setOtherScores(Object.values(grouped));
    });
    return () => unsubscribeOther();
  }, [currentUser]);

  // --- Fetch other users' handicap from "users" collection ---
  useEffect(() => {
    const fetchOtherHandicaps = async () => {
      const handicaps = {};
      await Promise.all(
        otherScores.map(async (score) => {
          try {
            const userDoc = await getDoc(doc(db, "users", score.userId));
            if (userDoc.exists()) {
              handicaps[score.userId] = userDoc.data().Handicap || "N/A";
            } else {
              handicaps[score.userId] = "N/A";
            }
          } catch (error) {
            console.error("Error fetching handicap for user:", score.userId, error);
            handicaps[score.userId] = "Error";
          }
        })
      );
      setOtherHandicaps(handicaps);
    };
    if (otherScores.length > 0) {
      fetchOtherHandicaps();
    }
  }, [otherScores]);

  // --- Handle new score submission ---
  const [newScore, setNewScore] = useState("");
  const [newPar, setNewPar] = useState("");
  const handleScoreSubmit = async (e) => {
    e.preventDefault();
    if (!newScore || !newPar) return;
    try {
      await addDoc(collection(db, "scores"), {
        userId: currentUser.uid,
        score: parseFloat(newScore),
        par: parseFloat(newPar),
        timestamp: serverTimestamp(),
      });
      setNewScore("");
      setNewPar("");
      // The useEffect above will update scores and recalculate handicap.
    } catch (error) {
      console.error("Error adding score:", error);
    }
  };

  return (
    <div className="scores-container">
      <h1 className="page-title">🏌️ Scores & Handicap</h1>
      
      {/* Section A: Current User's Scores */}
      <section className="my-scores">
        <h2>My Scores</h2>
        {myScores.length === 0 ? (
          <p>No scores submitted yet.</p>
        ) : (
          <ul>
            {myScores.map((score) => (
              <li key={score.id}>
                Score: {score.score}, Par: {score.par} –{" "}
                {score.timestamp ? new Date(score.timestamp.seconds * 1000).toLocaleString() : "Just now"}
              </li>
            ))}
          </ul>
        )}
        <p className="my-handicap">
          {myHandicap !== null ? `My Calculated Handicap: ${myHandicap}` : "Handicap not available"}
        </p>
        <form onSubmit={handleScoreSubmit} className="score-form">
          <input
            type="number"
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
            placeholder="Enter your score"
            required
          />
          <input
            type="number"
            value={newPar}
            onChange={(e) => setNewPar(e.target.value)}
            placeholder="Enter course par"
            required
          />
          <button type="submit">Submit Score</button>
        </form>
      </section>

      {/* Section B: Other Users' Latest Scores & Handicaps */}
      <section className="other-scores">
        <h2>Other Users' Scores & Handicaps</h2>
        {otherScores.length === 0 ? (
          <p>No other user scores available.</p>
        ) : (
          <ul>
            {otherScores.map((score) => (
              <li key={score.id}>
                User ID: {score.userId} – Latest Score: {score.score}, Par: {score.par} – Handicap: {otherHandicaps[score.userId] || "Loading..."}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Scores;
