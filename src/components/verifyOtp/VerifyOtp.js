import React from "react";

import InputControl from "components/InputControl/InputControl";

import styles from "./VerifyOtp.module.scss";

function VerifyOtp() {
  return (
    <div className="verifyOtp">
      <InputControl label="OTP" placeholder="Enter OTP" />
    </div>
  );
}

export default VerifyOtp;
