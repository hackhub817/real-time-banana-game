import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignupForm from "./components/SignupForm";
import Cookies from "js-cookie";
import LoginForm from "./components/LoginFom";
import Dashboard from "./components/Dashboard";

const App = () => {
  const token = Cookies.get("token");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
