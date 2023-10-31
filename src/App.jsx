import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./Component/Login";
import Home from "./Component/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    // You can implement logic here to check if the user is authenticated.
    // If the user is authenticated, set isAuthenticated to true.
    // For example, you can use Firebase Auth state listeners.
    // Here's a simplified example using a timeout.
    setTimeout(() => {
      setIsAuthenticated(true); // Set this to true if the user is authenticated.
    }, 2000);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route path="/*" element={<Navigate to="/login" />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
