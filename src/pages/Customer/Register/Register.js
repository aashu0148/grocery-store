import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import LoginInfo from "components/LoginInfo/LoginInfo";
import Button from "components/Button/Button";
import Spinner from "components/Spinner/Spinner";
import InputControl from "components/InputControl/InputControl";
import VerifyOtp from "components/verifyOtp/VerifyOtp";

import { validateEmail, validateMobile } from "utils/util";
import { checkRegisterDetails, register } from "api/user/register";
import { IS_USER_LOGGED } from "store/actionTypes";

import styles from "./Register.module.scss";

function Register() {
  const [errors, setErrors] = useState({});
  const [otpPage, setOtpPage] = useState(false);
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpass: "",
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeURL = (homepage) => {
    if (homepage) document.location.href = "/";
    else navigate("/login");
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
      isMerchant: false,
      firstName: values.fname,
      lastName: values.lname,
      mobile: values.mobile,
      email: values.email,
    };

    setSubmitButtonDisabled(true);
    checkRegisterDetails(registerDetails).then((res) => {
      setSubmitButtonDisabled(false);
      if (!res) {
        setOtpPage(false);
        return;
      }
      setOtpPage(true);
    });
  };

  const handleRegisterCustomer = () => {
    register({
      isMerchant: false,
      firstName: values.fname,
      lastName: values.lname,
      mobile: values.mobile,
      email: values.email,
    }).then((res) => {
      if (!res) return;
      else {
        localStorage.setItem("token", JSON.stringify(res.data.authToken));
        handleCustomerAuth(res.data);
        changeURL(true);
        toast.success("Registered & Logged in successfully");
      }
    });
  };

  const handleOtpVerification = () => {
    handleRegisterCustomer();
  };

  return (
    <div className={styles.register}>
      <div className={styles.registerLeftPanel}>
        <LoginInfo />
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
                type="tel"
                required
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

              <p>
                Already have an account ?&nbsp;
                <span
                  className={styles["registerRightPanel_helper-text"]}
                  onClick={() => changeURL()}
                >
                  Login now
                </span>
              </p>
              <Button type={`submit`} disabled={submitButtonDisabled}>
                Register
                {submitButtonDisabled && <Spinner small white />}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.registerRightPanel_otp}>
          <VerifyOtp mobile={values.mobile} onSuccess={handleOtpVerification} />
        </div>
      )}
    </div>
  );
}

export default Register;
