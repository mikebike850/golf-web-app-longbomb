import React, { useState, useEffect } from "react";
import { db, storage } from "../config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [handicap, setHandicap] = useState("");
  const [avatar, setAvatar] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);
            setFullName(data.FullName || "Not Set");
            setHandicap(data.Handicap || "Not Set");
            setAvatar(data.Avatar || "https://via.placeholder.com/150");
          } else {
            setUserData(null);
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

    if (newAvatar) {
      const avatarRef = ref(storage, `avatars/${currentUser.uid}`);
      await uploadBytes(avatarRef, newAvatar);
      const avatarURL = await getDownloadURL(avatarRef);
      await updateDoc(userRef, { Avatar: avatarURL });
      setAvatar(avatarURL);
    }

    setEditing(false);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      {userData ? (
        <div className="profile-info">
          <img src={avatar} alt="Profile Avatar" className="avatar" />
          {!editing ? (
            <>
              <p><strong>Name:</strong> {userData.FullName}</p>
              <p><strong>Email:</strong> {userData.Email}</p>
              <p><strong>Handicap:</strong> {userData.Handicap}</p>
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            </>
          ) : (
            <>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <input type="number" value={handicap} onChange={(e) => setHandicap(e.target.value)} />
              <input type="file" onChange={(e) => setNewAvatar(e.target.files[0])} />
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;





