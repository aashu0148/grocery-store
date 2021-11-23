import React, { useRef, useState } from "react";

import styles from "./LoginPage.module.scss";

import Button from "components/Button/Button";
import PasswordInput from "components/InputControl/InputControl";
import InputControl from "components/InputControl/InputControl";

function LoginPage() {
  const emailRef = useRef();
  const passRef = useRef();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const dummyErrors = {};
    if (emailRef.current.value === "") {
      dummyErrors.email = "Enter email";
      setErrors(dummyErrors);
    } else {
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          emailRef.current.value
        )
      ) {
        dummyErrors.email = "Enter valid email";
        setErrors(dummyErrors);
      }
    }
    if (passRef.current.value === "") {
      dummyErrors.password = "Enter password";
      setErrors(dummyErrors);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    validateForm();
  };

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
        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
          <div className={styles["loginRightPanel-mainBody"]}>
            <h2>Login</h2>

            <div className={styles["loginRightPanel-inputWrapper"]}>
              <InputControl
                label="Email"
                placeholder="Enter Email"
                ref={emailRef}
                error={errors?.email}
              />
            </div>

            <div className={styles["loginRightPanel-inputWrapper"]}>
              <InputControl
                label="Password"
                placeholder="Enter password"
                ref={passRef}
                error={errors?.password}
                password="true"
              />
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
