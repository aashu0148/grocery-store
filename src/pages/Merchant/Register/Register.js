import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "components/Navbar/Navbar";
import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";
import VerifyOtp from "components/verifyOtp/VerifyOtp";

import { validateEmail, validateMobile, validatePassword } from "utils/util";
import { checkRegisterDetails, register } from "api/user/register";
import { IS_MERCHANT_LOGGED } from "store/actionTypes";

import styles from "./Register.module.scss";

function Register() {
  const [errors, setErrors] = useState({});
  const [otpPage, setOtpPage] = useState(false);
  const [fnameHelper, setFnameHelper] = useState("");
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpass: "",
  });
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const auth = useSelector((state) => state.merchantReducer.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeURl = () => {
    navigate("/merchant/login");
  };

  const handleMerchantAuth = (merchantObj) => {
    dispatch({
      type: IS_MERCHANT_LOGGED,
      merchantAuth: true,
      merchantFirstName: merchantObj.firstName,
      merchantLastName: merchantObj.lastName,
      merchantMobile: merchantObj.mobile,
    });
    setFnameHelper(merchantObj.firstName);
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
      if (!validatePassword(values.password)) {
        dummyErrors.password =
          "Enter valid password i.e minimum length 6, must include 1 numeric and 1 alphabet ";
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const registerDetails = {
      firstName: values.fname,
      lastName: values.lname,
      mobile: values.mobile,
      isMerchant: true,
      password: values.password,
      email: values.email,
    };

    checkRegisterDetails(registerDetails).then((res) => {
      if (!res) {
        setOtpPage(false);
        return;
      }
      if (res?.status) {
        setOtpPage(true);
      }
    });
  };

  const handleRegisterMerchant = () => {
    register({
      firstName: values.fname,
      lastName: values.lname,
      mobile: values.mobile,
      isMerchant: true,
      password: values.password,
      email: values.email,
    }).then((res) => {
      if (!res) return;
      else {
        if (res?.status) {
          toast.success("Registered & Logged in successfully");
          localStorage.setItem("token", JSON.stringify(res.data.authToken));
          handleMerchantAuth(res.data);
        }
      }
    });
  };

  const handleOtpVerification = (isVerified) => {
    setIsOtpVerified(isVerified);
    if (isOtpVerified) handleRegisterMerchant();
    else return;
  };

  return (
    <>
      <Navbar auth={auth} fname={fnameHelper} />

      <div className={styles.register}>
        <div className={styles.registerLeftPanel}>
          <h1>Buy Best!</h1>
          <span>100+ products available at best price</span>
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
          <div className={styles.registerRightPanel_otp}>
            <VerifyOtp
              values={values.mobile}
              isVerified={handleOtpVerification}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Register;
