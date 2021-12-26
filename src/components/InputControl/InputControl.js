import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";

import { Eye, EyeOff } from "react-feather";

import styles from "./InputControl.module.scss";

const InputControl = forwardRef(({ subLabel, label, error, ...props }, ref) => {
  const [visible, setVisible] = useState(props.password ? false : true);
  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label}>
          {label}
          <span>{subLabel}</span>
        </label>
      )}
      <div className={styles.inputContainer}>
        <input
          className={`basic-input ${
            props.password ? styles.passwordInput : ""
          } ${error ? "basic-input-error" : ""}`}
          type={visible ? "text" : "password"}
          {...props}
          ref={ref}
        />
        {props.password && (
          <div className={styles.eye} onClick={() => setVisible(!visible)}>
            {visible ? <Eye /> : <EyeOff />}
          </div>
        )}
      </div>
      {error ? <p className={styles.errorMsg}>{error}</p> : ""}
    </div>
  );
});

InputControl.propsTypes = {
  password: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  subLabel: PropTypes.string,
};

export default InputControl;
