import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

import Navbar from "components/Navbar/Navbar";
import MerchantRegister from "pages/Merchant/Register/Register";
import MerchantLoginPage from "pages/Merchant/LoginPage/LoginPage";
import CustomerRegister from "pages/Customer/Register/Register";
import CustomerLogin from "pages/Customer/LoginPage/LoginPage";
import PageNotFound from "pages/common/PageNotFound/PageNotFound";
import HomePage from "pages/HomePage/HomePage";

import { checkAuth } from "api/user/authenticate";
import { userTypes } from "utils/constants";
import * as actionTypes from "store/actionTypes";

import "styles/main.scss";

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);
  const [isDataloaded, setIsDataLoaded] = useState(token ? false : true);

  const handleLogout = () => {
    if (isMerchant) {
      setIsMerchant(true);
      dispatch({
        type: actionTypes.MERCHANT_LOGOUT,
      });
    } else {
      dispatch({
        type: actionTypes.CUSTOMER_LOGOUT,
      });
    }
    setIsMerchant(false);
    setIsAuthenticated(false);
    localStorage.clear();
  };

  const authenticateUser = () => {
    checkAuth().then((res) => {
      setIsDataLoaded(true);
      if (!res) return;
      setIsAuthenticated(true);
      const userType = res?.data?.userType;
      if (userType === userTypes.merchant) {
        setIsMerchant(true);
        dispatch({
          type: actionTypes.IS_MERCHANT_LOGGED,
          merchantAuth: true,
          merchantFirstName: res?.data?.firstName,
          merchantLastName: res?.data?.lastName,
          merchantMobile: res?.data?.mobile,
          merchantEmail: res?.data?.email,
        });
      } else {
        setIsMerchant(false);
        dispatch({
          type: actionTypes.IS_CUSTOMER_LOGGED,
          customerAuth: true,
          customerFirstName: res?.data?.firstName,
          customerLastName: res?.data?.lastName,
          customerMobile: res?.data?.mobile,
        });
      }
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
            <Navbar
              auth={isAuthenticated}
              isMerchant={isMerchant}
              handleLogout={handleLogout}
            />

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
