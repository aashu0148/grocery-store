import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";

import { validateEmail, validateMobile } from "utils/util";
// import { sendOtp, verifyOtp } from "utils/firebase";
import { authLeftPanelImage } from "utils/constants";
import { checkRegisterDetails } from "api/user/register";

import styles from "./Register.module.scss";

function Register() {
  const [errors, setErrors] = useState({});

  const [otpPage, setOtpPage] = useState(false);
  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const passRef = useRef();
  const confirmpassRef = useRef();
  const navigate = useNavigate();

  const changeURl = () => {
    navigate("/merchant/login");
  };

  const validateForm = () => {
    const dummyErrors = {};
    if (fnameRef.current.value === "") {
      dummyErrors.fname = "Enter first name";
    }

    if (lnameRef.current.value === "") {
      dummyErrors.lname = "Enter last name";
    }

    if (mobileRef.current.value === "") {
      dummyErrors.mobile = "Enter mobile number";
    } else {
      if (!validateMobile(mobileRef.current.value)) {
        dummyErrors.mobile = "Enter valid mobile number";
      }
    }

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
      if (passRef.current.value.length < 8) {
        dummyErrors.password = "Must be at least 8 characters";
      }
      if (passRef.current.value.search(/[a-z]/i) < 0) {
        dummyErrors.password = "Must contain at least one letter";
      }
      if (passRef.current.value.search(/[0-9]/) < 0) {
        dummyErrors.password = "Must contain at least one digit";
      }
    }

    if (confirmpassRef.current.value === "") {
      dummyErrors.confirmpass = "Confirm password";
    } else {
      if (confirmpassRef.current.value !== passRef.current.value) {
        dummyErrors.confirmpass = "passwords must be same";
      }
    }
    setErrors(dummyErrors);
    if (Object.keys(dummyErrors).length !== 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleOtpVerification = () => {
    // if()
    // verifyOtp()
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    const registerDetails = {
      firstName: fnameRef.current.value,
      lastName: lnameRef.current.value,
      mobile: mobileRef.current.value,
      isMerchant: true,
      password: passRef.current.value,
      email: emailRef.current.value,
    };

    checkRegisterDetails(registerDetails).then((res) => {
      if (!res) {
        setOtpPage(false);
        return;
      }
      setOtpPage(true);
    });
    // const optStatus = sendOtp(mobileRef.current.value);
    // if (optStatus) {
    // }
    // setOtpPage(true);
  };

  return (
    <div className={styles.register}>
      <div className={styles.registerLeftPanel}>
        <h1>Buy Best!</h1>
        <span>100+ products available at best price</span>
        <img
          className={styles.registerLeftPanelImage}
          src={authLeftPanelImage}
          alt=""
        ></img>
      </div>
      {!otpPage ? (
        <div className={styles.registerRightPanel}>
          <form onSubmit={handleSubmit}>
            <div className={styles["registerRightPanel-mainBody"]}>
              <h2>Create an account</h2>
              <div className={styles["registerRightPanel-inputContainer"]}>
                <InputControl
                  placeholder="Enter first name"
                  label="First name"
                  ref={fnameRef}
                  error={errors?.fname}
                />
                <InputControl
                  label="Last name"
                  placeholder="Enter last name"
                  ref={lnameRef}
                  error={errors?.lname}
                />
              </div>
              <InputControl
                placeholder="Enter mobile number"
                label="Mobile number"
                ref={mobileRef}
                error={errors?.mobile}
              />
              <InputControl
                label="Email"
                placeholder="Enter email"
                ref={emailRef}
                error={errors?.email}
              />
              <div className={styles["registerRightPanel-inputContainer"]}>
                <InputControl
                  password="true"
                  placeholder="Enter password"
                  label="Password"
                  ref={passRef}
                  error={errors?.password}
                />

                <InputControl
                  placeholder={`Confirm Password`}
                  label={`Confirm Password`}
                  ref={confirmpassRef}
                  error={errors?.confirmpass}
                  password="true"
                />
              </div>
              <p>
                Already have an account.&nbsp;
                <span
                  className={styles["registerRightPanel_helper-text"]}
                  onClick={changeURl}
                >
                  Login now
                </span>
              </p>
              <Button type={`submit`}>Register</Button>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles["registerRightPanel_otp"]}>
          <form onSubmit={handleOtpVerification} className={styles.otpForm}>
            <div className={styles["registerRightPanel-mainBody"]}>
              <h2>Verify OTP</h2>
              <InputControl
                label="OTP"
                placeholder="Enter OTP"
                error={errors?.otp}
              />
              <p>
                <span>Resend OTP</span>
              </p>
              <Button type={`submit`}>Verify OTP</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Register;
