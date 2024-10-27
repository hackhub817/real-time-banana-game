import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginFom";
import PlayerDashboard from "./components/PlayerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import LeaderBoard from "./components/LeaderBoard";
import CreatePlayer from "./components/CreatePlayer";
import BlogPlayer from "./components/BlogPlayer";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/create-player" element={<CreatePlayer />} />
            <Route path="/block-player" element={<BlogPlayer />} />
          </Route>
          <Route element={<ProtectedRoute requiredRole="player" />}>
            <Route path="/playerDashboard" element={<PlayerDashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
