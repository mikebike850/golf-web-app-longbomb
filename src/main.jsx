import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter
      future={{ 
        v7_startTransition: true, 
        v7_relativeSplatPath: true 
      }}
    >
      <App />
    </BrowserRouter>
  </AuthProvider>
);
