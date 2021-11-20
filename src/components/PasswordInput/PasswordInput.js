import React, { useState } from "react";

import { Eye, EyeOff } from "react-feather";

import styles from "./PasswordInput.module.scss";

function PasswordInput(props) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.container}>
      <input
        className="basic-input"
        type={visible ? "text" : "password"}
        {...props}
      />
      <div className={styles.eye} onClick={() => setVisible(!visible)}>
        {visible ? <EyeOff /> : <Eye />}
      </div>
    </div>
  );
}

export default PasswordInput;
