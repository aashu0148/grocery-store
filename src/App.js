import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "styles/main.scss";

import Register from "pages/Merchant/Register/Register";
import LoginPage from "pages/Merchant/LoginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
