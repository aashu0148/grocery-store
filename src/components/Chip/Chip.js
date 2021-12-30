import React from "react";
import PropTypes from "prop-types";
import { X } from "react-feather";

import styles from "./Chip.module.scss";

function Chip(props) {
  return (
    <div
      className={`${styles.container} ${props.orange ? styles.orange : ""} ${
        props.red ? styles.red : ""
      }`}
    >
      <span>{props.label}</span>
      {props.isClose && (
        <X onClick={() => (props.onClose ? props.onClose() : "")} />
      )}
    </div>
  );
}

Chip.propTypes = {
  onClose: PropTypes.func,
  isClose: PropTypes.bool,
  orange: PropTypes.bool,
  red: PropTypes.bool,
  label: PropTypes.string,
};

export default Chip;
