import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { ShoppingCart, ChevronDown } from "react-feather";

import Searchbar from "components/SearchBar/Searchbar";

import logo from "assets/images/logo.png";

import styles from "./Navbar.module.scss";

function Navbar(props) {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.content}>
        <div className={styles.categories}>
          <span>
            Categories
            <ChevronDown />
          </span>
        </div>
        <Searchbar />
        <ShoppingCart />
        <div className={styles.authSection}>
          {!props.auth ? (
            <>
              <Link to="/merchant/register">Signup</Link>
              <span>/</span>
              <Link to="/merchant/login">Login</Link>
            </>
          ) : (
            <>
              <div className={styles.user}>
                <img src="https://cdn-icons-png.flaticon.com/128/145/145843.png" alt="" />
                <span>Nitish</span>
                <ChevronDown />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
Navbar.propTypes = {
  className: PropTypes.string,
  auth: PropTypes.bool,
};

export default Navbar;
