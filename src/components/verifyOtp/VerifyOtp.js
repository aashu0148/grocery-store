import React, { useState } from "react";

import InputControl from "components/InputControl/InputControl";
import Button from "components/Button/Button";

import { validateOtp } from "utils/util";
import { sendOtp, verifyOtp } from "utils/firebase";

import styles from "./VerifyOtp.module.scss";

function VerifyOtp(props) {
  let timer;
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpObj, setOtpObj] = useState({});
  const [otpTimer, setOtpTimer] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  props.isVerified(isVerified);

  const handleSendOtp = async (mobile) => {
    clearTimeout(timer);
    const otpResult = await sendOtp(mobile);
    timer = setTimeout(() => {
      setOtpTimer(true);
    }, 6000);
    if (!otpResult) return;

    setOtpObj(otpResult);
  };
  handleSendOtp();

  const handleOtpVerification = async (event) => {
    event.preventDefault();
    let dummyError = "";
    if (!validateOtp(otp)) {
      dummyError = "Enter valid OTP";
      setError(dummyError);
      return false;
    }
    if (otp)
      if (!otpObj) return false;
      else {
        const user = await verifyOtp(otpObj, otp);
        if (user === "") return false;
        else {
          setIsVerified(true);
          return true;
        }
      }
  };

  return (
    <form onSubmit={handleOtpVerification} className={styles.otpForm}>
      <div className={styles["mainBody"]}>
        <h2>Verify OTP</h2>
        <InputControl
          label="OTP"
          placeholder="Enter OTP"
          maxLength={6}
          onChange={(event) => setOtp(event.target.value)}
          value={otp}
          error={error}
        />
        {otpTimer ? (
          <p onClick={handleSendOtp}>
            <span className={styles.resendOtp}>Resend OTP</span>
          </p>
        ) : (
          ""
        )}

        <Button type={`submit`}>Verify OTP</Button>
      </div>
    </form>
  );
}

export default VerifyOtp;
