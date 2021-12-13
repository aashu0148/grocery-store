import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Home, User, LogOut, X } from "react-feather";

import styles from "./MerchantSidepanel.module.scss";

function MerchantSidepanel() {
  const [isSlide, setIsSlide] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.mainPanel}>
        <div
          className={`${styles.fixedChild} ${
            isSlide ? styles.fixedChildActive : ""
          }`}
        >
          <NavLink
            to="/admin"
            activeClassName={styles.selectedIcon}
            className={styles.iconContainer}
          >
            {isSlide ? (
              <X className={styles.icon} onClick={() => setIsSlide(!isSlide)} />
            ) : (
              <Menu
                className={styles.icon}
                onClick={() => setIsSlide(!isSlide)}
              />
            )}
          </NavLink>

          <NavLink
            to="/"
            className={(navData) =>
              navData.isActive ? styles.navlinkActive : styles.iconContainer
            }
          >
            <div className={styles.itemContainer}>
              <Home className={styles.icon} />
              <li>Home</li>
              <div className={styles.selectedSymbol}></div>
            </div>
          </NavLink>
          <NavLink
            to="/product"
            className={(navData) =>
              navData.isActive ? styles.navlinkActive : styles.iconContainer
            }
          >
            <div className={styles.itemContainer}>
              <User className={styles.icon} />
              <li>Profile</li>
              <div className={styles.selectedSymbol}></div>
            </div>
          </NavLink>
          <NavLink
            to="/admin"
            className={(navData) =>
              navData.isActive ? styles.navlinkActive : styles.iconContainer
            }
          >
            <div className={styles.itemContainer}>
              <LogOut className={styles.icon} />
              <li>Logout</li>
              <div className={styles.selectedSymbol}></div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default MerchantSidepanel;
