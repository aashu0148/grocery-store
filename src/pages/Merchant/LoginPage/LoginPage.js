import React, { useRef, useState } from "react";

import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";
import Navbar from "components/Navbar/Navbar";

import { validateEmail } from "utils/util";
import { login } from "api/user/login";

import styles from "./LoginPage.module.scss";
import toast from "react-hot-toast";

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
      isMerchant: true,
      password: passRef.current.value,
      email: emailRef.current.value,
    };
    login(loginDetails).then(async (res) => {
      if (!res) return;
      toast.success("Logged in successfully");
    });
  };

  return (
    <>
      <Navbar />
      <div className={styles.login}>
        <div className={styles.loginLeft}>
          <h1>Buy Best!</h1>
          <span>100+ products available at best price</span>
          <img
            className={styles.loginLeftImage}
            // src={authLeftPanelImage}
            src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Z3JvY2VyeSUyMHN0b3JlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
            alt="Left panel img"
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
    </>
  );
}

export default LoginPage;
