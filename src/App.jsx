import { Routes, Route } from "react-router-dom"; // ✅ No Router Here
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Scores from "./pages/Scores";
import Challenges from "./pages/Challenges";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
