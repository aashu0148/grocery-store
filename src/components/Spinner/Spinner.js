import React from "react";
import PropTypes from "prop-types";

import styles from "./Spinner.module.scss";

function Spinner(props) {
  return (
    <div className={`${styles.loader} ${props.small ? styles.small : ""}`}>
      <div className={styles.container}></div>
      <div className={styles.line}></div>
      <div className={styles.line2}></div>
    </div>
  );
}

Spinner.propType = {
  small: PropTypes.bool,
};

export default Spinner;
