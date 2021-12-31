import React, { useState } from "react";
import PropTypes from "prop-types";

import VerifyOtp from "components/verifyOtp/VerifyOtp";
import Modal from "components/Modal/Modal";
import InputControl from "components/InputControl/InputControl";
import Button from "components/Button/Button";

import styles from "./ForgotPass.module.scss";

function ForgotPass({ mobile }) {
  const [isModal, setIsModal] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  console.log(mobile);
  const closeModal = () => {
    setIsModal(false);
  };

  const handleOtpVerification = () => {
    setIsOtpVerified(true);
  };

  const handleForgotPass = () => {
    setIsModal(true);
  };

  return (
    <>
      <span className={styles.forgotPass} onClick={handleForgotPass}>
        Forgot Password?
      </span>
      {isModal ? (
        <Modal onClose={closeModal}>
          {!isOtpVerified ? (
            <VerifyOtp mobile={mobile} onSuccess={handleOtpVerification} />
          ) : (
            <div className={styles.newPassContainer}>
              <InputControl
                label="New password"
                placeholder="Enter new password"
              />
              <InputControl
                label="Confirm password"
                placeholder="Confirm password"
              />
              <Button>Save</Button>
            </div>
          )}
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

ForgotPass.propTypes = {
  mobile: PropTypes.string,
};

export default ForgotPass;
