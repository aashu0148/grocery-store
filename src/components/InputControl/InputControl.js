import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";

import { Eye, EyeOff } from "react-feather";

import styles from "./InputControl.module.scss";

const InputControl = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(props.password ? false : true);
  return (
    <div className={styles.container}>
      {props.label && <label className={styles.label}>{props.label}</label>}
      <div className={styles.inputContainer}>
        <input
          className="basic-input"
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
      {props.error ? <p className={styles.errorMsg}>{props.error}</p> : ""}
    </div>
  );
});

InputControl.propsTypes = {
  password: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
};

export default InputControl;
