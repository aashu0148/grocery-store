import React, { useState } from "react";
import styles from "./Register.module.scss";
import bgSignin from "assets/images/bgSignin.png";
import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";
import { register, checkRegisterDetails } from "api/user/register";
import { validateEmail, validateMobile } from "utils/util";
import VerifyOtp from "components/verifyOtp/VerifyOtp";
import { useNavigate } from "react-router-dom";
const Register = (props) => {
  const [errMsg, seterrMsg] = useState({});
  const [RegisterDetails, setRegisterDetails] = useState({});
  const [otpPage, setOtpPage] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();
  const changeUrl = () => {
    navigate("/login");
  };
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
  });
  const validateForm = () => {
    const dummyMsg = {};
    if (values.fname === "") {
      dummyMsg.name = "Enter name";
    }
    if (values.lname === "") {
      dummyMsg.lname = "Enter last name";
    }
    if (values.email === "") {
      dummyMsg.email = "Enter Email";
    } else if (!validateEmail(values.email)) {
      dummyMsg.email = "Enter Valid Email";
    }
    if (values.mobile === "") {
      dummyMsg.mobile = "Enter mobile number";
    } else if (!validateMobile(values.mobile)) {
      dummyMsg.mobile = "Enter valid number";
    }
    seterrMsg(dummyMsg);
    if (Object.keys(dummyMsg).length !== 0) {
      return false;
    } else {
      return true;
    }
  };
  const handleRegisterCustomer = () => {
    register({
      firstName: values.fname,
      lastName: values.lname,
      mobile: values.mobile,
      isMerchant: false,
      email: values.email,
    }).then((res) => {
      console.log(res);
    });
  };

  const handleOtpVerification = (isVerified) => {
    console.log(isVerified);
    setIsOtpVerified(isVerified);
    if (isOtpVerified) handleRegisterCustomer();
    else return;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setRegisterDetails({
      firstName: values.fname,
      lastName: values.lname,
      mobile: values.mobile,
      isMerchant: false,
      email: values.email,
    });

    checkRegisterDetails(RegisterDetails).then(async (res) => {
      if (!res) {
        setOtpPage(false);
        return;
      } else {
        setOtpPage(true);
      }
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2 className={styles.heading}>
          Buy Best!
          <span>100+ products available at best price</span>
        </h2>
        <div className={styles.imageContainer}>
          <img
            src={bgSignin}
            alt="SignIn background"
            className={styles.bgImage}
          />
        </div>
      </div>
      {!otpPage ? (
        <div className={styles.right}>
          <div className={styles.mobileLogin}>
            <h3 className={styles.heading}>Create an account</h3>
            <div className={styles.mobileLogin_divider}></div>

            <form className={styles.mobileLogin_form} onSubmit={handleSubmit}>
              <div className={styles.nameFields}>
                <InputControl
                  placeholder="Enter Name"
                  label="Name"
                  onChange={(event) =>
                    setValues({ ...values, fname: event.target.value })
                  }
                  error={errMsg?.name}
                />
                <InputControl
                  placeholder="Enter last name"
                  label="Last Name"
                  onChange={(event) =>
                    setValues({ ...values, lname: event.target.value })
                  }
                  error={errMsg?.lname}
                />
              </div>

              <InputControl
                placeholder="Enter Email"
                label="Email"
                error={errMsg?.email}
                onChange={(event) =>
                  setValues({ ...values, email: event.target.value })
                }
              />
              <InputControl
                placeholder="Enter mobile number"
                label="Mobile number"
                onChange={(event) =>
                  setValues({ ...values, mobile: event.target.value })
                }
                error={errMsg?.mobile}
                maxLength={10}
              />

              <Button icon type="submit" className={styles.submitButton}>
                Create account
              </Button>
            </form>
            <div className={styles.mobileLogin_divider}></div>
            <div className={styles.crateAccount}>
              Have an account? &nbsp;
              <span className={styles.helperText} onClick={changeUrl}>
                Login now
              </span>
            </div>
          </div>
          <div id="recaptcha"></div>
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
  );
};

export default Register;
