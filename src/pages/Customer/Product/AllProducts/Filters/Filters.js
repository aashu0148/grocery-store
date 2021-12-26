import React from "react";
import PropTypes from "prop-types";

import Button from "components/Button/Button";

import styles from "./Filters.module.scss";

function Filters(props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.heading}>Filter out results</p>
        <div className={styles.buttons}>
          <p className={`${styles.clear} styled-link`}>Clear</p>
          <Button>Apply</Button>
        </div>
      </div>

      <div className={styles.body}></div>
    </div>
  );
}

Filters.propTypes = {
  onApply: PropTypes.func,
};

export default Filters;
