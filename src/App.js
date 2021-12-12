import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "components/Navbar/Navbar";
import MerchantRegister from "pages/Merchant/Register/Register";
import MerchantLoginPage from "pages/Merchant/LoginPage/LoginPage";
import PageNotFound from "pages/common/PageNotFound/PageNotFound";
import HomePage from "pages/Customer/HomePage/HomePage";
import AdminPage from "pages/Merchant/AdminPage/AdminPage";
import Spinner from "components/Spinner/Spinner";

import { checkAuth } from "api/user/authenticate";

import "styles/main.scss";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Spinner />
      ) : (
        <Router>
          <React.Fragment>
            <Navbar />
            {isAuthenticated ? (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/*" element={<PageNotFound />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/admin" element={<AdminPage />} />

                <Route
                  path="/merchant/register"
                  element={<MerchantRegister />}
                />
                <Route path="/merchant/login" element={<MerchantLoginPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/*" element={<PageNotFound />} />
              </Routes>
            )}
          </React.Fragment>
        </Router>
      )}

      <div id="recaptcha" />
    </div>
  );
}

export default App;
