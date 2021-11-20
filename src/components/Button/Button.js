import React from "react";
import PropTypes from "prop-types";
import { ArrowRight } from "react-feather";

import styles from "./Button.module.scss";

function Button(props) {
  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${styles.button} ${
        props.outline ? styles["button-outline"] : ""
      } ${props.disabled ? styles["button-disabled"] : ""} ${
        props.className || ""
      } ${
        props.disabled && props.outline ? styles["outline-button-disabled"] : ""
      }
        ${props.delete ? styles.buttonDelete : ""} 
        ${props.bordered ? styles["button-bordered"] : ""} 
        ${props.cancel ? styles["button-cancel"] : ""} 
        ${
          props.bordered && props.disabled
            ? styles["button-bordered-disabled"]
            : ""
        }
        `}
    >
      {props.children}
      {props.icon ? <ArrowRight className={styles.icon} /> : ""}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.bool,
  delete: PropTypes.bool,
  bordered: PropTypes.bool,
  cancel: PropTypes.bool,
};

export default Button;
