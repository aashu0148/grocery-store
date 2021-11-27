import React, { useState, useRef } from "react";
import styles from "./LoginPage.module.scss";
import bgSignin from "assets/images/bgSignin.png";
import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";
// import { login } from "api/user/login";
const LoginPage = (props) => {
  const [errMsg, seterrMsg] = useState({});
  const numberRef = useRef();
  const otpRef = useRef();

  const validateForm = () => {
    const dummyMsg = {};

    if (numberRef.current.value === "") {
      dummyMsg.mobile = "Enter mobile number";
    } else if (
      numberRef.current.value.length !== 10 &&
      !/^\d{10}$/.test(numberRef.current.value)
    ) {
      dummyMsg.mobile = "Enter valid number";
    }

    if (otpRef.current.value === "") {
      dummyMsg.otp = "Enter OTP";
    } else if (otpRef.current.value.length !== 6) {
      dummyMsg.otp = "Enter valid OTP";
    }

    seterrMsg(dummyMsg);
    if (Object.keys(dummyMsg).length !== 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2 className={styles.heading}>Welcome</h2>
        <div className={styles.imageContainer}>
          <img
            src={bgSignin}
            alt="SignIn background"
            className={styles.bgImage}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.mobileLogin}>
          <h3 className={styles.heading}>Sign in</h3>
          <div className={styles.mobileLogin_divider}></div>
          <form className={styles.mobileLogin_form} onSubmit={handleSubmit}>
            <InputControl
              placeholder="Enter mobile number"
              label="Mobile number"
              ref={numberRef}
              error={errMsg?.mobile}
              maxLength={10}
            />
            <InputControl
              placeholder="Enter OTP"
              label="OTP"
              ref={otpRef}
              error={errMsg?.otp}
            />
            <div className={styles.resendOTP}>Resend OTP</div>
            <Button icon type="submit" className={styles.submitButton}>
              login
            </Button>
          </form>
          <div className={styles.mobileLogin_divider}></div>
          <div className={styles.crateAccount}>
            New here? &nbsp;
            <span
              className={styles.helperText}
              // onClick={"#"}
            >
              Create an account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
