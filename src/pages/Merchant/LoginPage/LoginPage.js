import React, { useRef } from "react";

import styles from "./LoginPage.module.scss";

import Button from "components/Button/Button";
import PasswordInput from "components/InputControl/InputControl";

function LoginPage() {
  const emailRef = useRef();
  const passRef = useRef();

  const handleSubmit = () => {
    console.log(emailRef.current);
  };

  // const validateEmail = () => {

  // }

  return (
    <div className={styles.login}>
      <div className={styles.loginLeft}>
        <h1>Buy Best!</h1>
        <span>100+ products available at best price</span>
        <img
          className={styles.loginLeftImage}
          src="https://image.shutterstock.com/z/stock-vector-set-of-fruit-and-vegetables-logo-for-groceries-agriculture-stores-packaging-and-advertising-318421853.jpg"
        ></img>
        <div className={styles.loginLeftPanelIcons}></div>
      </div>
      <div className={styles.loginRightPanel}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles["loginRightPanel-mainBody"]}>
            <h2>Login</h2>

            <div className={styles["loginRightPanel-inputWrapper"]}>
              <label>Email</label>
              <input ref={emailRef} placeholder="Enter Email" />
            </div>

            <div className={styles["loginRightPanel-inputWrapper"]}>
              <label>Password</label>
              <PasswordInput placeholder={`Enter Password`} />
            </div>
            <span
              className={styles["loginRightPanel_helper-text"]}
              // onClick={changeURl}
            >
              Forgot password?
            </span>
            <Button type={`submit`}>Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
