import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import bgSignin from "assets/images/bgSignin.png";
import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";
import { useNavigate } from "react-router-dom";
import VerifyOtp from "components/verifyOtp/VerifyOtp";
import { checkMobile, login } from "api/user/login";
import { validateMobile } from "utils/util";
const LoginPage = (props) => {
  const [errMsg, seterrMsg] = useState({});
  const [mobile, setMobile] = useState("");

  const [otpPage, setOtpPage] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const navigate = useNavigate();
  const changeUrl = () => {
    navigate("/register");
  };
  const validateForm = () => {
    const dummyMsg = {};

    if (mobile === "") {
      dummyMsg.mobile = "Enter mobile number";
    } else if (!validateMobile(mobile)) {
      dummyMsg.mobile = "Enter valid number";
    }
    seterrMsg(dummyMsg);
    if (Object.keys(dummyMsg).length !== 0) {
      return false;
    } else {
      return true;
    }
  };
  const handleloginCustomer = () => {
    login({
      mobile: mobile,
      isMerchant: false,
    }).then((res) => {
      console.log(res);
    });
  };

  const handleOtpVerification = (isVerified) => {
    console.log(isVerified);
    setIsOtpVerified(isVerified);
    if (isOtpVerified) handleloginCustomer();
    else return;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    checkMobile(mobile).then(async (res) => {
      console.log(res);
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
            <h3 className={styles.heading}>Sign in</h3>
            <div className={styles.mobileLogin_divider}></div>
            <form className={styles.mobileLogin_form} onSubmit={handleSubmit}>
              <InputControl
                placeholder="Enter mobile number"
                label="Mobile number"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                error={errMsg?.mobile}
                maxLength={10}
              />
              <Button icon type="submit" className={styles.submitButton}>
                Login
              </Button>
            </form>
            <div className={styles.mobileLogin_divider}></div>
            <div className={styles.crateAccount}>
              New here? &nbsp;
              <span className={styles.helperText} onClick={changeUrl}>
                Create an account
              </span>
            </div>
          </div>
          <div id="recaptcha"></div>
        </div>
      ) : (
        <div className={styles.registerRightPanel_otp}>
          <VerifyOtp values={mobile} isVerified={handleOtpVerification} />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
