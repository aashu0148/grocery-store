import "styles/main.scss";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MerchantRegister from "pages/Merchant/Register/Register";
import MerchantLoginPage from "pages/Merchant/LoginPage/LoginPage";
import CustomerLoginPage from "pages/Customer/LoginPage/LoginPage";
import CustomerRegister from "pages/Customer/Register/Register";
import PageNotFound from "pages/common/PageNotFound/PageNotFound";
import { checkAuth } from "api/user/authenticate";

function App() {
  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDataloaded, setIsDataLoaded] = useState(token ? false : true);

  const authenticateUser = () => {
    checkAuth().then((res) => {
      setIsDataLoaded(true);
      if (!res) return;
      setIsAuthenticated(true);
    });
  };

  useEffect(() => {
    if (!isDataloaded) authenticateUser();
  }, []);

  return (
    <div className="App">
      <Toaster
        toastOptions={{
          duration: 4000,
          position: "bottom-right",
          style: { marginBottom: "30px", marginLeft: "30px" },
        }}
      />
      {!isDataloaded ? (
        <p>Spinner will come here</p>
      ) : (
        <Router>
          {isAuthenticated ? (
            <Routes>
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/merchant/register" element={<MerchantRegister />} />
              <Route path="/merchant/login" element={<MerchantLoginPage />} />
              <Route path="/*" element={<PageNotFound />} />
              <Route path="/register" element={<CustomerRegister />} />
              <Route path="/login" element={<CustomerLoginPage />} />
            </Routes>
          )}
        </Router>
      )}
      <div id="recaptcha" />
    </div>
  );
}

export default App;
