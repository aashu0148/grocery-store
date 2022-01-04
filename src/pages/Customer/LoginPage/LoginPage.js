import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import Button from "components/Button/Button";
import Spinner from "components/Spinner/Spinner";
import LoginInfo from "components/LoginInfo/LoginInfo";
import InputControl from "components/InputControl/InputControl";
import VerifyOtp from "components/verifyOtp/VerifyOtp";

import { IS_USER_LOGGED } from "store/actionTypes";
import { validateMobile } from "utils/util";
import { checkMobile, login } from "api/user/login";

import styles from "./LoginPage.module.scss";

function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const dummyErrors = {};
    if (mobile === "") {
      dummyErrors.mobile = "Enter mobile number";
    } else {
      if (!validateMobile(mobile)) {
        dummyErrors.mobile = "Enter valid mobile number";
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
    else navigate("/register");
  };

  const handleCustomerAuth = (obj) => {
    dispatch({
      type: IS_USER_LOGGED,
      auth: true,
      firstName: obj.firstName,
      lastName: obj.lastName,
      mobile: obj.mobile,
      avatar: obj.profileImage,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setSubmitButtonDisabled(true);
    checkMobile(mobile).then((res) => {
      setSubmitButtonDisabled(false);
      if (!res) return;
      setShowVerifyOtp(true);
    });
  };

  const handleLogin = () => {
    login({ mobile }).then((res) => {
      if (!res) return;
      localStorage.setItem("token", JSON.stringify(res.data.authToken));
      handleCustomerAuth(res.data);
      toast.success("Logged in successfully");
      handleNavigate(true);
    });
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginLeft}>
        <LoginInfo />
      </div>
      <div className={styles.loginRightPanel}>
        {showVerifyOtp ? (
          <VerifyOtp mobile={mobile} onSuccess={handleLogin} />
        ) : (
          <form className={styles.loginForm} onSubmit={handleFormSubmit}>
            <div className={styles["loginRightPanel-mainBody"]}>
              <h2>Login</h2>
              <InputControl
                label="Mobile"
                placeholder="Enter Mobile"
                type="tel"
                maxLength="10"
                onChange={(event) => setMobile(event.target.value)}
                error={errors?.mobile}
              />

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
                Request OTP
                {submitButtonDisabled && <Spinner small white />}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
