import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import {
  BiStoreAlt as StoreIcon,
  BiUser as UserIcon,
  BiCart as CartIcon,
  BiHeart as FavoriteIcon,
  BiSearchAlt as ExploreIcon,
} from "react-icons/bi";

import { Search, ShoppingCart, ChevronDown, ChevronUp } from "react-feather";
import Dropdown from "components/Dropdown/Dropdown";

import avatar from "assets/images/man.png";

import styles from "./Navbar.module.scss";

function Navbar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef();
  const name = useSelector((state) => state.firstName);
  const profileImage = useSelector((state) => state.profileImage);
  const isMobileView = useSelector((state) => state.isMobileView);
  const isAuthenticated = props.auth ? true : false;
  const currentPathname = location.pathname + location.search;

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

  const activeLinks = {
    explore: /explore|product/.test(currentPathname),
    cart: /cart/.test(currentPathname),
    wishlist: /wishlist/.test(currentPathname),
    account: /account|login|register/.test(currentPathname),
  };

  return isMobileView ? (
    <div className={styles.mobileNavbar}>
      <NavLink
        to="/"
        className={(navData) =>
          navData.isActive ? `${styles.activeIcon} ${styles.icon}` : styles.icon
        }
      >
        <StoreIcon />
        <p>Home</p>
      </NavLink>
      <NavLink
        to={activeLinks.explore ? currentPathname : "/explore"}
        className={`${styles.icon} ${
          activeLinks.explore ? styles.activeIcon : ""
        }`}
      >
        <ExploreIcon />
        <p>Explore</p>
      </NavLink>

      {isAuthenticated && (
        <>
          <NavLink
            to={activeLinks.cart ? currentPathname : "/cart"}
            className={`${styles.icon} ${
              activeLinks.cart ? styles.activeIcon : ""
            }`}
          >
            <CartIcon />
            <p>Cart</p>
          </NavLink>
          <NavLink
            to={activeLinks.wishlist ? currentPathname : "/wishlist"}
            className={`${styles.icon} ${
              activeLinks.wishlist ? styles.activeIcon : ""
            }`}
          >
            <FavoriteIcon />
            <p>Wishlist</p>
          </NavLink>
        </>
      )}
      <NavLink
        to={
          activeLinks.account
            ? currentPathname
            : isAuthenticated
            ? "/account"
            : "/login"
        }
        className={`${styles.icon} ${
          activeLinks.account ? styles.activeIcon : ""
        }`}
      >
        <UserIcon />
        <p>Account</p>
      </NavLink>
    </div>
  ) : (
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
        {!isAuthenticated ? (
          <div className={styles.auth}>
            {currentPathname?.includes("register") ||
            currentPathname?.includes("login") ? (
              currentPathname?.includes("merchant") ? (
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
                  currentPathname?.includes("merchant")
                    ? "/merchant/register"
                    : "/register"
                }
              >
                Signup
              </Link>
              <span>/</span>
              <Link
                to={
                  currentPathname?.includes("merchant")
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
            <div
              className={styles.shoppingCart}
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart />
            </div>
            <div
              className={styles.user}
              onClick={() => setShowUserDropdown(true)}
            >
              <img
                src={profileImage || ""}
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
                    <li onClick={() => setShowUserDropdown(false)}>
                      <Link to={"/wishlist"}>Wishlist</Link>
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
