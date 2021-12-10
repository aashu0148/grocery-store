import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import InputControl from "components/InputControl/InputControl";
import Button from "components/Button/Button";

import { validateOtp } from "utils/util";
import { sendOtp, verifyOtp } from "utils/firebase";

import styles from "./VerifyOtp.module.scss";

let timerInterval;
function VerifyOtp(props) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpObj, setOtpObj] = useState({});
  const [otpTimer, setOtpTimer] = useState(20);
  const [showTimer, setShowTimer] = useState(false);

  const handleSendOtp = async () => {
    setShowTimer(false);
    const mobileNumber = props.mobile;
    const otpResult = await sendOtp(mobileNumber);
    setShowTimer(true);

    if (!otpResult) return;

    runOtpTimer();
    setOtpObj(otpResult);
  };

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
          props.isVerified(true);
          return true;
        }
      }
  };

  const runOtpTimer = () => {
    clearInterval(timerInterval);
    setOtpTimer(20);
    timerInterval = setInterval(
      () =>
        setOtpTimer((prev) => {
          if (prev === 1) {
            clearInterval(timerInterval);
          }

          return prev - 1;
        }),
      1000
    );
  };

  useEffect(() => {
    handleSendOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleOtpVerification} className={styles.otpForm}>
      <div className={styles.mainBody}>
        <h2>Verify OTP</h2>
        <InputControl
          label="OTP"
          placeholder="Enter OTP"
          maxLength={6}
          onChange={(event) => setOtp(event.target.value)}
          value={otp}
          error={error}
        />
        {showTimer ? (
          <p
            onClick={() => (otpTimer === 0 ? handleSendOtp() : "")}
            className={`${styles.resend} ${
              otpTimer === 0 ? styles.activeResend : ""
            }`}
          >
            Resend OTP <span> {otpTimer ? otpTimer : ""} </span>
          </p>
        ) : (
          ""
        )}

        <Button type={`submit`}>Verify OTP</Button>
      </div>
    </form>
  );
}

verifyOtp.propTypes = {
  isVerified: PropTypes.func,
  mobile: PropTypes.string,
};

export default VerifyOtp;
