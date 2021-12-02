import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";
import Navbar from "components/Navbar/Navbar";

import { validateEmail } from "utils/util";
import { login } from "api/user/login";

import styles from "./LoginPage.module.scss";

function LoginPage() {
  const emailRef = useRef();
  const passRef = useRef();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  console.log(auth);

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

  const handleNavigate = () => {
    navigate("/merchant/register");
  };

  const handleMerchantAuth = (merchantObj) => {
    dispatch({
      type: "IS_MERCHANT_LOGGEDIN",
      merchantAuth: true,
      merchantName: merchantObj.name,
      merchantMobile: merchantObj.mobile,
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
    login(loginDetails).then(async (res) => {
      if (!res) return;
      else {
        if (res?.status) {
          console.log(res);
          toast.success("Logged in successfully");
          localStorage.setItem("token", JSON.stringify(res.data.authToken));
          handleMerchantAuth(res.data);
        }
      }
    });
  };

  return (
    <>
      <Navbar auth={auth} />
      <div className={styles.login}>
        <div className={styles.loginLeft}>
          <h1>Buy Best!</h1>
          <span>100+ products available at best price</span>
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
              <p>
                <span className={styles["loginRightPanel_helper-text"]}>
                  Forgot password?
                </span>
              </p>
              <p>
                Not registered.
                <span
                  onClick={handleNavigate}
                  className={styles["loginRightPanel_helper-text"]}
                >
                  &nbsp;Register now
                </span>
              </p>
              <Button type={`submit`}>Login</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
