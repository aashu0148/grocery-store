import React, { useState, useRef } from "react";
import styles from "./Register.module.scss";
import bgSignin from "assets/images/bgSignin.png";
import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";
import { register } from "api/user/register";
const Register = (props) => {
  const [errMsg, seterrMsg] = useState({});
  const nameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const numberRef = useRef();
  const otpRef = useRef();
console.log(register.result);
  const validateForm = () => {
    const dummyMsg = {};
    if (nameRef.current.value === "") {
      dummyMsg.name = "Enter name";
    }
    if (lnameRef.current.value === "") {
      dummyMsg.lname = "Enter last name";
    }
    if (emailRef.current.value === "") {
      dummyMsg.email = "Enter Email";
    } else if (
      !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/.test(emailRef.current.value)
    ) {
      dummyMsg.email = "Enter Valid Email";
    }
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
        <h2 className={styles.heading}>Join us</h2>
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
          <h3 className={styles.heading}>Create an account</h3>
          <div className={styles.mobileLogin_divider}></div>
          <form className={styles.mobileLogin_form} onSubmit={handleSubmit}>
            <div className={styles.nameFields}>
              <InputControl
                placeholder="Enter Name"
                label="Name"
                ref={nameRef}
                error={errMsg?.name}
              />
              <InputControl
                placeholder="Enter last name"
                label="Last Name"
                ref={lnameRef}
                error={errMsg?.lname}
              />
            </div>

            <InputControl
              placeholder="Enter Email"
              label="Email"
              ref={emailRef}
              error={errMsg?.email}
            />
            <InputControl
              placeholder="Enter mobile number"
              label="Mobile number"
              ref={numberRef}
              error={errMsg?.mobile}
            />
            <InputControl
              placeholder="Enter OTP"
              label="OTP"
              ref={otpRef}
              error={errMsg?.otp}
            />
            <div className={styles.resendOTP}>Resend OTP</div>
            <Button icon type="submit" className={styles.submitButton}>
              Create new account
            </Button>
          </form>
          <div className={styles.mobileLogin_divider}></div>
          <div className={styles.crateAccount}>
            Have an account? &nbsp;
            <span
              className={styles.helperText}
              // onClick={"#"}
            >
              Login now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
