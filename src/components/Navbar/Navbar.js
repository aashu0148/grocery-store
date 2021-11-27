import React from "react";

import styles from "./Navbar.module.scss";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}></div>
      <div className={styles.categories}></div>

      <div className={styles.authSection}></div>
    </div>
  );
}

export default Navbar;
