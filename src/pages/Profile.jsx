import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [handicap, setHandicap] = useState("");

  useEffect(() => {
    if (currentUser) {
      console.log("Fetching user data for:", currentUser.uid);

      const fetchUserData = async () => {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            console.log("User data retrieved:", docSnap.data());
            const data = docSnap.data();

            setUserData(data);
            setFullName(data.FullName || "");
            setHandicap(data.Handicap || "");
          } else {
            console.log("No user document found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  const handleUpdate = async () => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      FullName: fullName,
      Handicap: handicap,
    });

    setUserData({ FullName: fullName, Handicap: handicap });
    setEditing(false);
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Profile</h2>
      {userData ? (
        <div className="profile-info">
          {editing ? (
            <>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
              />
              <input
                type="number"
                value={handicap}
                onChange={(e) => setHandicap(e.target.value)}
                placeholder="Handicap"
              />
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {fullName || "Not Set"}</p>
              <p><strong>Email:</strong> {userData.Email || "Not Set"}</p>
              <p><strong>Handicap:</strong> {handicap || "Not Set"}</p>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            </>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile; // Ensure this export exists
