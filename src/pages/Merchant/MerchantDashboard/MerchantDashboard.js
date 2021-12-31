import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import MerchantOverView from "./MerchantOverview/MerchantOverview";
import MerchantSidePanel from "components/MerchantSidePanel/MerchantSidePanel";
import MerchantProduct from "./MerchantProduct/MerchantProduct";

import styles from "./MerchantDashboard.module.scss";

function MerchantDashboard(props) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <MerchantSidePanel />
      </div>

      <div className={styles.right}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute auth={props.isAuthenticated}>
                <MerchantOverView />
              </PrivateRoute>
            }
          />
          <Route
            path="/product"
            element={
              <PrivateRoute auth={props.isAuthenticated}>
                <MerchantProduct />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/merchant/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

MerchantDashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default MerchantDashboard;
