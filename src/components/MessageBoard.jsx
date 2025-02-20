import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../config/firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import "./MessageBoard.css";

function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !media) return;

    let mediaUrl = "";
    if (media) {
      const mediaRef = ref(storage, `media/${media.name}`);
      await uploadBytes(mediaRef, media);
      mediaUrl = await getDownloadURL(mediaRef);
    }

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      user: user.displayName,
      userPhoto: user.photoURL,
      timestamp: new Date(),
      mediaUrl,
    });

    setNewMessage("");
    setMedia(null);
  };

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  return (
    <div className="message-board">
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <img src={message.userPhoto} alt={message.user} className="user-photo" />
            <div className="message-content">
              <div className="message-header">
                <span className="user-name">{message.user}</span>
                <span className="timestamp">{new Date(message.timestamp.toDate()).toLocaleString()}</span>
              </div>
              <p>{message.text}</p>
              {message.mediaUrl && <img src={message.mediaUrl} alt="media" className="media" />}
            </div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <input type="file" onChange={handleMediaChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default MessageBoard;