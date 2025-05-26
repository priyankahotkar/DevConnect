import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Timeline from "./pages/Timeline";
import Explore from "./pages/Explore";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </Router>
  );
}

export default App;
