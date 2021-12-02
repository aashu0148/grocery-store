import React from "react";
import { Search } from "react-feather";

import styles from "./Searchbar.module.scss";

function Searchbar() {
  return (
    <div className={styles.searchBox}>
      <input type="text" placeholder="Search..." />
      <div className={styles.searchIcon}>
        <Search />
      </div>
    </div>
  );
}

export default Searchbar;
