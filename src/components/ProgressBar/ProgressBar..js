import React from "react";
import PropTypes from "prop-types";

import styles from "./ProgressBar.module.scss";

function ProgressBar({ progress }) {
  return (
    <div className={styles.container}>
      <div style={{ width: progress + "%" }} className={styles.progress} />
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.string,
};

export default ProgressBar;
