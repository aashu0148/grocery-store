import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

import { Search, ShoppingCart, ChevronDown, ChevronUp } from "react-feather";
import Dropdown from "components/Dropdown/Dropdown";

import avatar from "assets/images/man.png";

import styles from "./Navbar.module.scss";

function Navbar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef();
  const name = useSelector((state) => state.firstName);
  const avatarLink = useSelector((state) => state.avatar);

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const onLogout = () => {
    if (props.handleLogout) props.handleLogout();
    navigate("/");
  };

  const handleSearch = () => {
    const query = searchInputRef?.current?.value;

    if (!query || !query.trim()) return;

    window.location.replace(`/product?search=${query.trim()}`);
  };

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <div className={styles.logo}>grocery</div>
      </Link>
      <div className={styles.content}>
        <form
          className={styles.searchBox}
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <input
            ref={searchInputRef}
            type="text"
            className="basic-input"
            placeholder="Search product"
          />
          <div className={styles.searchIcon}>
            <Search onClick={handleSearch} />
          </div>
        </form>
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
              <img
                src={avatarLink || ""}
                onError={(event) => {
                  event.target.src = avatar;
                  event.target.onerror = null;
                }}
                alt="avatar"
              />
              {name && (
                <p className={styles.userName}>
                  Hi <span>{name}</span>{" "}
                </p>
              )}
              {showUserDropdown ? <ChevronUp /> : <ChevronDown />}
              {showUserDropdown && (
                <Dropdown
                  startFromRight
                  onClose={() => setShowUserDropdown(false)}
                >
                  <div className={styles.userDropdown}>
                    {props.isMerchant ? (
                      <li onClick={() => setShowUserDropdown(false)}>
                        <Link to={"/merchant/dashboard"}>Dashboard</Link>
                      </li>
                    ) : (
                      ""
                    )}
                    <li onClick={() => setShowUserDropdown(false)}>
                      <Link to={"/profile"}>Profile</Link>
                    </li>
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
