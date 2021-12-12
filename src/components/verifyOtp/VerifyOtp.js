import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import InputControl from "components/InputControl/InputControl";
import Button from "components/Button/Button";
import Spinner from "components/Spinner/Spinner";

import { validateOtp } from "utils/util";
import { sendOtp, verifyOtp } from "utils/firebase";

import styles from "./VerifyOtp.module.scss";

let timerInterval;
function VerifyOtp(props) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpObj, setOtpObj] = useState({});
  const [otpTimer, setOtpTimer] = useState(60);
  const [showTimer, setShowTimer] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

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
        setSubmitButtonDisabled(true);
        const user = await verifyOtp(otpObj, otp);
        setSubmitButtonDisabled(false);

        if (!user) {
          setError("Invalid OTP");
          return false;
        } else {
          props.onSuccess && props.onSuccess();
          return true;
        }
      }
  };

  const runOtpTimer = () => {
    clearInterval(timerInterval);
    setOtpTimer(60);
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
      <div className={styles["mainBody"]}>
        <h2>Verify OTP</h2>
        <InputControl
          label="OTP"
          placeholder="Enter OTP"
          maxLength={6}
          onChange={(event) => {
            setOtp(event.target.value);
            setError("");
          }}
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
          <p className={`${styles.resend}`}>
            Sending OTP to {props.mobile} ...
          </p>
        )}

        <Button type="submit" disabled={submitButtonDisabled}>
          Verify OTP {submitButtonDisabled && <Spinner small white />}
        </Button>
      </div>

      <div id="recaptcha-container">
        <div id="recaptcha" />
      </div>
    </form>
  );
}

verifyOtp.propTypes = {
  mobile: PropTypes.string,
  onSuccess: PropTypes.func,
};

export default VerifyOtp;
