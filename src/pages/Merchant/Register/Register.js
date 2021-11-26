import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";

import { validateEmail, validateMobile, validateOtp } from "utils/util";
import { sendOtp, verifyOtp } from "utils/firebase";
import { checkRegisterDetails, registerMerchant } from "api/user/register";

import authLeftPanelImage from "assets/images/leftPanelImage.png";

import styles from "./Register.module.scss";

function Register() {
  const [errors, setErrors] = useState({});
  const [otpPage, setOtpPage] = useState(false);
  const [registerDetails, setRegisterDetails] = useState({});
  const [otpObj, setOtpObj] = useState({});
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpass: "",
    otp: "",
  });

  const navigate = useNavigate();

  const changeURl = () => {
    navigate("/merchant/login");
  };

  const validateForm = () => {
    const dummyErrors = {};
    if (values.fname === "") {
      dummyErrors.fname = "Enter first name";
    }

    if (values.lname === "") {
      dummyErrors.lname = "Enter last name";
    }

    if (values.mobile === "") {
      dummyErrors.mobile = "Enter mobile number";
    } else if (!validateMobile(values.mobile)) {
      dummyErrors.mobile = "Enter valid mobile number";
    }

    if (values.email === "") {
      dummyErrors.email = "Enter email";
    } else {
      if (!validateEmail(values.email)) {
        dummyErrors.email = "Enter valid email";
      }
    }

    if (values.password === "") {
      dummyErrors.password = "Enter password";
    } else {
      if (values.password.length < 6) {
        dummyErrors.password = "Must be at least 8 characters";
      }
      if (values.password.search(/[a-z]/i) < 0) {
        dummyErrors.password = "Must contain at least one letter";
      }
      if (values.password.search(/[0-9]/) < 0) {
        dummyErrors.password = "Must contain at least one digit";
      }
    }

    if (values.confirmpass === "") {
      dummyErrors.confirmpass = "Confirm password";
    } else {
      if (values.confirmpass !== values.password) {
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

  const handleOtpVerification = async (event) => {
    event.preventDefault();
    const dummyErrors = {};
    if (!validateOtp(values.otp)) {
      dummyErrors.otp = "Enter valid OTP";
      setErrors(dummyErrors);
      return;
    }
    if (values.otp)
      if (!otpObj) return;
      else {
        const user = await verifyOtp(otpObj, values.otp);
        if (user === "") return;
        registerMerchant(registerDetails);
      }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setRegisterDetails({
      firstName: values.fname,
      lastName: values.lname,
      mobile: values.mobile,
      isMerchant: true,
      password: values.password,
      email: values.email,
    });

    checkRegisterDetails(registerDetails).then(async (res) => {
      if (!res) {
        setOtpPage(false);
        return;
      } else {
        if (res?.status) {
          const optResult = await sendOtp(values.mobile);
          if (!optResult) return;

          setOtpObj(optResult);
          setOtpPage(true);
        }
      }
    });
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
                  onChange={(event) =>
                    setValues({ ...values, fname: event.target.value })
                  }
                  value={values.fname}
                  error={errors?.fname}
                />
                <InputControl
                  label="Last name"
                  placeholder="Enter last name"
                  onChange={(event) =>
                    setValues({ ...values, lname: event.target.value })
                  }
                  value={values.lname}
                  error={errors?.lname}
                />
              </div>
              <InputControl
                placeholder="Enter mobile number"
                label="Mobile number"
                onChange={(event) =>
                  setValues({ ...values, mobile: event.target.value })
                }
                value={values.mobile}
                error={errors?.mobile}
                maxLength={10}
              />
              <InputControl
                label="Email"
                placeholder="Enter email"
                onChange={(event) =>
                  setValues({ ...values, email: event.target.value })
                }
                value={values.email}
                error={errors?.email}
              />
              <div className={styles["registerRightPanel-inputContainer"]}>
                <InputControl
                  password="true"
                  placeholder="Enter password"
                  label="Password"
                  onChange={(event) =>
                    setValues({ ...values, password: event.target.value })
                  }
                  value={values.password}
                  error={errors?.password}
                />

                <InputControl
                  placeholder={`Confirm Password`}
                  label={`Confirm Password`}
                  onChange={(event) =>
                    setValues({ ...values, confirmpass: event.target.value })
                  }
                  value={values.confirmpass}
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
            <div id="recaptcha"></div>
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
                maxLength={6}
                onChange={(event) =>
                  setValues({ ...values, otp: event.target.value })
                }
                value={values.otp}
                error={errors?.otp}
              />
              <p>
                <span onClick={handleSubmit}>Resend OTP</span>
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
