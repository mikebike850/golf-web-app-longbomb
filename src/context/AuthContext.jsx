import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  function logout() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
