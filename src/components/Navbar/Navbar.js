import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";

import { Search, ShoppingCart, ChevronDown, ChevronUp } from "react-feather";
import Dropdown from "components/Dropdown/Dropdown";

import avatar from "assets/images/man.png";

import styles from "./Navbar.module.scss";

function Navbar(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const onLogout = () => {
    if (props.handleLogout) props.handleLogout();
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <div className={styles.logo}>grocery</div>
      </Link>
      <div className={styles.content}>
        <div className={styles.searchBox}>
          <input
            type="text"
            className="basic-input"
            placeholder="Search product"
          />
          <div className={styles.searchIcon}>
            <Search />
          </div>
        </div>
        {!props.auth ? (
          <div className={styles.auth}>
            {location.pathname?.includes("register") ||
            location.pathname?.includes("login") ? (
              location.pathname?.includes("merchant") ? (
                <Link to="/login" className="styled-link">
                  Are you a customer ?
                </Link>
              ) : (
                <Link to="/merchant/login" className="styled-link">
                  Are you a merchant ?
                </Link>
              )
            ) : (
              ""
            )}
            <div className={styles.customerAuth}>
              <Link
                to={
                  location.pathname?.includes("merchant")
                    ? "/merchant/register"
                    : "/register"
                }
              >
                Signup
              </Link>
              <span>/</span>
              <Link
                to={
                  location.pathname?.includes("merchant")
                    ? "/merchant/login"
                    : "/login"
                }
              >
                Login
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.shoppingCart}>
              <ShoppingCart />
            </div>
            <div
              className={styles.user}
              onClick={() => setShowUserDropdown(true)}
            >
              <img src={avatar} alt="avatar" />
              <span>{props.fname}</span>
              {showUserDropdown ? <ChevronUp /> : <ChevronDown />}
              {showUserDropdown && (
                <Dropdown
                  startFromRight
                  onClose={() => setShowUserDropdown(false)}
                >
                  <div className={styles.userDropdown}>
                    <li>Profile</li>
                    <li onClick={onLogout}>Logout</li>
                  </div>
                </Dropdown>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
Navbar.propTypes = {
  className: PropTypes.string,
  auth: PropTypes.bool,
  isMerchant: PropTypes.bool,
  handleLogout: PropTypes.func,
};

export default Navbar;
