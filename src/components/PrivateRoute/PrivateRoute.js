import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router";

function PrivateRoute(props) {
  return props.auth ? props.children : <Navigate to="/" />;
}

PrivateRoute.propTypes = {
  auth: PropTypes.bool,
  children: PropTypes.node,
};

export default PrivateRoute;
