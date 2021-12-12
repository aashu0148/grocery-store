import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "components/Navbar/Navbar";
import MerchantRegister from "pages/Merchant/Register/Register";
import MerchantLoginPage from "pages/Merchant/LoginPage/LoginPage";
import CustomerRegister from "pages/Customer/Register/Register";
import CustomerLogin from "pages/Customer/LoginPage/LoginPage";
import PageNotFound from "pages/common/PageNotFound/PageNotFound";
import HomePage from "pages/HomePage/HomePage";

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
        <p>Spinner will come here</p>
      ) : (
        <Router>
          <React.Fragment>
            <Navbar />

            <Routes>
              {/* --> Customer Routes */}
              <Route
                path="/register"
                element={
                  isAuthenticated ? <Navigate to="/" /> : <CustomerRegister />
                }
              />
              <Route
                path="/login"
                element={
                  isAuthenticated ? <Navigate to="/" /> : <CustomerLogin />
                }
              />
              <Route path="/" element={<HomePage />} />

              {/* --> Merchant Routes  */}
              <Route
                path="/merchant/register"
                element={
                  isAuthenticated ? <Navigate to="/" /> : <MerchantRegister />
                }
              />
              <Route
                path="/merchant/login"
                element={
                  isAuthenticated ? <Navigate to="/" /> : <MerchantLoginPage />
                }
              />
              {/* private route example ->
              <Route
                path="/merchant"
                element={
                  <PrivateRoute auth={isAuthenticated}>
                    <h1>Hello</h1>
                  </PrivateRoute>
                }
              /> */}

              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </React.Fragment>
        </Router>
      )}
    </div>
  );
}

export default App;
