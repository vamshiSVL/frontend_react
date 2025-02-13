import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./vendordashboard/pages/LandingPage";
import "./App.css";

const App = () => {
  return (
    <Router> {/* Wrap everything inside BrowserRouter */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
