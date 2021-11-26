import LoginPage from "pages/Customer/LoginPage/LoginPage";
import Register from "pages/Customer/Register/Register";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// import Register from "pages/Merchant/Register/Register";
// import LoginPage from "pages/Merchant/LoginPage/LoginPage";

import "styles/main.scss";

function App() {
  return (
    <div className="App">
      <Toaster
        toastOptions={{
          duration: 4000,
          position: "bottom-right",
          style: { marginBottom: "30px", marginLeft: "30px" },
        }}
      />
      {/* <LoginPage /> */}
      {/* <Register /> */}
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
