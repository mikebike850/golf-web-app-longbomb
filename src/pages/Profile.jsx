import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../config/firebaseConfig";
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
  const [aboutMe, setAboutMe] = useState("");
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
            setFullName(data.FullName || "");
            setHandicap(data.Handicap || "");
            setAboutMe(data.AboutMe || "");
            setAvatar(data.Avatar || "https://via.placeholder.com/150");
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
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const updateData = {
        FullName: fullName,
        Handicap: handicap,
        AboutMe: aboutMe,
      };

      await updateDoc(userRef, updateData);

      if (newAvatar) {
        const avatarRef = ref(storage, `avatars/${currentUser.uid}`);
        await uploadBytes(avatarRef, newAvatar);
        const avatarURL = await getDownloadURL(avatarRef);
        await updateDoc(userRef, { Avatar: avatarURL });
        setAvatar(avatarURL);
      }

      setUserData({ ...userData, ...updateData });
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>
      {userData ? (
        editing ? (
          <div className="profile-edit">
            <div className="profile-info-top">
              <img src={avatar} alt="Profile Avatar" className="avatar" />
              <input
                type="file"
                onChange={(e) => setNewAvatar(e.target.files[0])}
              />
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
            </div>
            <div className="about-me-section">
              <h3>About Me</h3>
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                placeholder="Tell us about yourself"
              ></textarea>
            </div>
            <div className="profile-edit-buttons">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="profile-view">
            <div className="profile-info-top">
              <img src={avatar} alt="Profile Avatar" className="avatar" />
              <p>
                <strong>Name:</strong> {fullName || "Not Set"}
              </p>
              <p>
                <strong>Email:</strong> {userData.Email || "Not Set"}
              </p>
              <p>
                <strong>Handicap:</strong> {handicap || "Not Set"}
              </p>
            </div>
            <div className="about-me-section">
              <h3>About Me</h3>
              <p>{aboutMe || "Not Set"}</p>
            </div>
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          </div>
        )
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
