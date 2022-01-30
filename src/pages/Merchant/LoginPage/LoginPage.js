import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "components/Button/Button";
import Spinner from "components/Spinner/Spinner";
import LoginInfo from "components/LoginInfo/LoginInfo";
import InputControl from "components/InputControl/InputControl";

import { validateEmail } from "utils/util";
import { login } from "api/user/login";
import { IS_USER_LOGGED } from "store/actionTypes";

import styles from "./LoginPage.module.scss";
import ForgotPassword from "components/ForgotPassword/ForgotPassword";

function LoginPage() {
  const emailRef = useRef();
  const passRef = useRef();
  const [errors, setErrors] = useState({});
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const isMobileView = useSelector((state) => state.isMobileView);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleNavigate = (homepage) => {
    if (homepage) document.location.href = "/";
    else navigate("/merchant/register");
  };

  const handleMerchantAuth = (merchantObj) => {
    dispatch({
      type: IS_USER_LOGGED,
      auth: true,
      firstName: merchantObj.firstName,
      lastName: merchantObj.lastName,
      mobile: merchantObj.mobile,
      email: merchantObj.email,
      avatar: merchantObj.profileImage,
      isMerchant: true,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const loginDetails = {
      isMerchant: true,
      password: passRef.current.value,
      email: emailRef.current.value,
    };

    setSubmitButtonDisabled(true);
    login(loginDetails).then(async (res) => {
      setSubmitButtonDisabled(false);
      if (!res) return;
      else {
        if (res?.status) {
          localStorage.setItem("token", JSON.stringify(res.data.authToken));
          handleMerchantAuth(res.data);
          toast.success("Logged in successfully");
          handleNavigate(true);
        }
      }
    });
  };

  return (
    <div
      className={`${styles.login} ${
        isMobileView ? styles.mobileContainer : ""
      }`}
    >
      {!isMobileView && (
        <div className={styles.loginLeft}>
          <LoginInfo />
        </div>
      )}
      <div className={styles.loginRightPanel}>
        {isMobileView && (
          <div className={styles.header}>
            <p className={styles.heading}>Merchant</p>
            <Link to="/login" className={`styled-link ${styles.link}`}>
              Not a merchant ?
            </Link>{" "}
          </div>
        )}

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
            <p>
              <span className={styles["loginRightPanel_helper-text"]}>
                <ForgotPassword />
              </span>
            </p>
            <p>
              Not registered ?
              <span
                onClick={() => handleNavigate()}
                className={styles["loginRightPanel_helper-text"]}
              >
                &nbsp;Register now
              </span>
            </p>
            <Button type={`submit`} disabled={submitButtonDisabled}>
              Login {submitButtonDisabled && <Spinner small white />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
