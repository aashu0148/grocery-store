import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Package, BarChart2 } from "react-feather";

import styles from "./MerchantSidePanel.module.scss";

function MerchantSidePanel() {
  const [isSlide, setIsSlide] = useState(false);

  const navLinks = [
    {
      to: "/merchant/dashboard",
      icon: BarChart2,
      text: "Overview",
    },
    {
      to: "/merchant/product",
      icon: Package,
      text: "Products",
    },
  ];

  return (
    <div className={styles.container}>
      <div
        className={`${styles.fixedChild} ${
          isSlide ? styles.fixedChildActive : ""
        }`}
      >
        <div
          className={styles.itemContainer}
          onClick={() => setIsSlide(!isSlide)}
        >
          <div className={styles.icon}>
            {isSlide ? (
              <X className={styles.icon} />
            ) : (
              <Menu className={styles.icon} />
            )}
          </div>
          <li>Close</li>
        </div>

        <div className={styles.separator} />

        <div className={styles.linksContainer}>
          {navLinks?.map((item, index) => (
            <NavLink
              key={index + item.to}
              to={item.to}
              className={(navData) =>
                navData.isActive ? styles.navLinkActive : styles.iconContainer
              }
              onClick={() => (isSlide ? setIsSlide(false) : "")}
            >
              <div className={styles.itemContainer}>
                <div className={styles.icon}>
                  <item.icon />
                </div>
                <li>{item.text}</li>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MerchantSidePanel;
