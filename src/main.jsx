import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // ✅ Wraps App inside AuthProvider
import { BrowserRouter as Router } from "react-router-dom"; // ✅ Router should ONLY be here

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router> {/* ✅ Router should only be here */}
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
