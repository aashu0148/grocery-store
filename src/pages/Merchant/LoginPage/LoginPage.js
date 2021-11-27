import React, { useRef, useState } from "react";

import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";

import { validateEmail } from "utils/util";
import { loginMerchant } from "api/user/login";

import authLeftPanelImage from "assets/images/leftPanelImage.png";

import styles from "./LoginPage.module.scss";

function LoginPage() {
  const emailRef = useRef();
  const passRef = useRef();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const dummyErrors = {};
    if (emailRef.current.value === "") {
      dummyErrors.email = "Enter email";
    } else {
      if (!validateEmail(emailRef.current.value)) {
        dummyErrors.email = "Enter valid email";
      }
    }
    if (passRef.current.value === "") {
      dummyErrors.password = "Enter password";
    } else {
      if (passRef.current.value.length < 6) {
        dummyErrors.password = "Enter valid password";
      }
    }
    setErrors(dummyErrors);
    if (Object.keys(dummyErrors).length !== 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const loginDetails = {
      mobile: "",
      isMerchant: true,
      password: passRef.current.value,
      email: emailRef.current.value,
    };
    loginMerchant(loginDetails).then(async (res) => {
      if (!res) return;
      console.log("logged in");
    });
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginLeft}>
        <h1>Buy Best!</h1>
        <span>100+ products available at best price</span>
        <img
          className={styles.loginLeftImage}
          src={authLeftPanelImage}
          alt=""
        ></img>
      </div>
      <div className={styles.loginRightPanel}>
        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
          <div className={styles["loginRightPanel-mainBody"]}>
            <h2>Login</h2>
            <InputControl
              label="Email"
              placeholder="Enter Email"
              ref={emailRef}
              error={errors?.email}
            />
            <InputControl
              label="Password"
              placeholder="Enter password"
              ref={passRef}
              error={errors?.password}
              password="true"
            />
            <span className={styles["loginRightPanel_helper-text"]}>
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
