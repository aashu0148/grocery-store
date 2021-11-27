import React, { useState, useRef } from "react";
import styles from "./Register.module.scss";
import bgSignin from "assets/images/bgSignin.png";
import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";
import { register, checkRegisterDetails } from "api/user/register";
import { validateEmail, validateMobile } from "utils/util";
import { sendOtp } from "utils/firebase";

const Register = (props) => {
  const [errMsg, seterrMsg] = useState({});
  const [RegisterDetails, setRegisterDetails] = useState({});
  const [otpObj, setOtpObj] = useState({});

  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    otp: "",
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

    // if (values.otp === "") {
    //   dummyMsg.otp = "Enter OTP";
    // } else if (values.otp.length !== 6) {
    //   dummyMsg.otp = "Enter valid OTP";
    // }

    seterrMsg(dummyMsg);
    if (Object.keys(dummyMsg).length !== 0) {
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setRegisterDetails({
      firstName: values.fname,
      lastName: values.lname,
      mobile: values.mobile,
      isMerchant: false,
      // password: values.password,
      email: values.email,
    });

    checkRegisterDetails(RegisterDetails).then(async (res) => {
      console.log(res);
      if (!res) {
        // setOtpPage(false);
        return;
      } else {
        if (res?.status) {
          
          const optResult = await sendOtp(values.mobile);
          if (!optResult) return;
          
          
          setOtpObj(optResult);
          // setOtpPage(true);
        }
      }
    });
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
            {/* <InputControl
              placeholder="Enter OTP"
              label="OTP"
                onChange={(event) => setValues({...values,otp:event.target.value})}
              error={errMsg?.otp}
            /> */}
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

      <div id="recaptcha"></div>
    </div>
  );
};

export default Register;
