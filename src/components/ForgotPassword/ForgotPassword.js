import React, { useState } from "react";
import PropTypes from "prop-types";

import VerifyOtp from "components/verifyOtp/VerifyOtp";
import Modal from "components/Modal/Modal";
import InputControl from "components/InputControl/InputControl";
import Button from "components/Button/Button";
import { validateMobile } from "utils/util";
import toast from "react-hot-toast";

import styles from "./ForgotPassword.module.scss";

function ForgotPassword({ mobile }) {
  const [isModal, setIsModal] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const closeModal = () => {
    setIsModal(false);
  };

  const handleOtpVerification = () => {
    setIsOtpVerified(true);
  };

  const handleForgotPass = () => {
    if (!validateMobile(mobile)) {
      toast.error("Enter your mobile or email");
      return;
    }
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
            <VerifyOtp
              isBackgroundTransparent={true}
              mobile={mobile}
              onSuccess={handleOtpVerification}
            />
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
              <div className={styles.buttonContainer}>
                <Button>Save</Button>
                <Button cancel onClick={closeModal}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

ForgotPassword.propTypes = {
  mobile: PropTypes.string,
};

export default ForgotPassword;
