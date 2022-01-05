import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { StopCircle, Folder } from "react-feather";
import { useSelector } from "react-redux";

import { validateMobile } from "utils/util";
import { getAvatarLink } from "api/user/avatar";

import Button from "components/Button/Button";
import ImagePreview from "components/ImagePreview/ImagePreview";
import InputControl from "components/InputControl/InputControl";
import Modal from "components/Modal/Modal";
import VerifyOtp from "components/verifyOtp/VerifyOtp";
import ForgotPassword from "components/ForgotPassword/ForgotPassword";
import Spinner from "components/Spinner/Spinner";

import styles from "./ProfileComponent.module.scss";

function ProfileComponent() {
  const fnameSelector = useSelector((state) => state.firstName);
  const lnameSelector = useSelector((state) => state.lastName);
  const mobileSelector = useSelector((state) => state.mobile);
  const emailSelector = useSelector((state) => state.email);
  const avatarSelector = useSelector((state) => state.avatar);

  const [profileUrl, setProfileUrl] = useState(avatarSelector || "");
  const [errorMsg, setErrorMsg] = useState("");
  const [isChangeMobileOtpSent, setIsChangeMobileOtpSent] = useState(false);
  const [newMobile, setNewMobile] = useState("");
  const [changeInfo, setChangeInfo] = useState({ type: "" });
  const [file, setFile] = useState("");
  const [avatarUrl, setAvatarUrl] = useState({
    men: [],
    women: [],
  });
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [showOverlaySpinner, setShowOverlaySpinner] = useState(false);
  const newMobileRef = useRef();
  const profileInputRef = useRef();

  const closeEditingModal = () => {
    setChangeInfo({
      type: "",
    });
    setErrorMsg("");
  };

  const handleChangeMobileNumber = () => {
    console.log(newMobileRef);
    if (!newMobileRef?.current.value) {
      setErrorMsg("Enter new number");
      return;
    }
    setErrorMsg("");
    if (!validateMobile(newMobileRef?.current?.value)) {
      setErrorMsg("enter valid mobile number");
      return;
    }
    setNewMobile(newMobileRef?.current?.value);
    setIsChangeMobileOtpSent(true);
  };
  const handleChangePassword = () => {
    //will do it later when api will be ready
  };

  const handleEditingModal = (type) => {
    setChangeInfo({
      type: type,
    });
  };

  const handleAvatar = (url) => {
    if (!url || url === profileUrl) return;
    setShowOverlaySpinner(true);
    setProfileUrl(url);
    setFile("");
  };

  const imageUploadHandler = () => {
    setFile(profileInputRef.current.files[0]);
  };

  const changePassword = (
    <div className={styles.changeDetailModal}>
      <InputControl
        label="Current password"
        placeholder="Enter current password"
      />
      <InputControl label="New password" placeholder="Enter new password" />
      <InputControl label="Confirm password" placeholder="confirm password" />
      <div className={styles.buttonContainer}>
        <Button onClick={handleChangePassword}>Done</Button>
        <Button cancel onClick={closeEditingModal}>
          Cancel
        </Button>
      </div>
    </div>
  );

  const changeMobile = (
    <div className={styles.changeDetailModal}>
      {isChangeMobileOtpSent ? (
        <VerifyOtp mobile={newMobile} />
      ) : (
        <div className={styles.changeDetailModal}>
          <InputControl
            ref={newMobileRef}
            error={errorMsg ? errorMsg : ""}
            maxLength={10}
            label="New Mobile number"
            placeholder="Enter new mobile number"
          />
          <div className={styles.buttonContainer}>
            <Button onClick={handleChangeMobileNumber}>Change</Button>
            <Button cancel onClick={closeEditingModal}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  const fetchAvatars = () => {
    getAvatarLink().then((res) => {
      setAvatarLoaded(true);
      if (!res) return;
      setAvatarUrl({
        men: res?.data?.men,
        women: res?.data?.women,
      });
    });
  };

  useEffect(() => {
    fetchAvatars();
  }, []);

  useEffect(() => {}, [isChangeMobileOtpSent]);

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h2>My Profile</h2>
        <Button>Save</Button>
      </div>

      <div className={styles.profile}>
        <div className={styles.leftMainContainer}>
          <div className={styles.left}>
            {showOverlaySpinner && (
              <div className={styles.overlaySpinner}>
                <Spinner />
              </div>
            )}
            {avatarLoaded ? (
              <React.Fragment>
                <div className={styles.profile_image}>
                  <ImagePreview
                    onFileLoad={() => setShowOverlaySpinner(false)}
                    className={styles.additionalStyle}
                    large
                    hideDeleteIcon={true}
                    isCrop={true}
                    src={typeof file === "object" ? null : profileUrl}
                    file={typeof file === "object" ? file : null}
                  />

                  <input
                    id={styles.imageInput}
                    type="file"
                    ref={profileInputRef}
                    onChange={imageUploadHandler}
                  />
                  <div
                    className={styles.editProfileIcon}
                    onClick={() => profileInputRef.current.click()}
                  >
                    <Folder />
                  </div>
                </div>
                <div className={styles.avatarsContainer}>
                  {avatarUrl?.men.map((avatar, index) => (
                    <div
                      className={styles.avatar}
                      onClick={() => handleAvatar(avatar)}
                      key={index}
                    >
                      <img src={avatar} alt="avatar" />
                    </div>
                  ))}
                  {avatarUrl?.women.map((avatar, index) => (
                    <div
                      className={styles.avatar}
                      onClick={() => handleAvatar(avatar)}
                      key={index}
                    >
                      <img src={avatar} alt="avatar" />
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
        <div className={styles.rightMainContainer}>
          <div className={styles.right}>
            <div className={styles.sections}>
              <div className={styles.headingSection}>
                <StopCircle />
                <span>Personal details</span>
              </div>
              <div className={styles.inputControlContainer}>
                <InputControl
                  label="First name"
                  placeholder="Enter first name"
                  defaultValue={fnameSelector}
                />
                <InputControl
                  label="Last name"
                  placeholder="Enter last name"
                  defaultValue={lnameSelector}
                />
              </div>
            </div>
            <div className={styles.sections}>
              <div className={styles.headingSection}>
                <StopCircle />
                <span>Contact Details</span>
              </div>
              <div className={styles.inputControlContainer}>
                <InputControl
                  label="Email"
                  defaultValue={emailSelector}
                  placeholder="Enter email"
                />
              </div>
              <div className={styles.inputControlContainer}>
                <InputControl
                  label="Mobile"
                  placeholder="Enter Mobile number"
                  defaultValue={mobileSelector}
                  disabled
                />
                <span onClick={() => handleEditingModal("mobile")}>Change</span>
              </div>
            </div>
            <div className={styles.sections}>
              <div className={styles.headingSection}>
                <StopCircle />
                <span>Passwords {`&`} security</span>
              </div>
              <div
                className={[
                  styles.inputControlContainer,
                  styles.passwordControl,
                ].join(" ")}
              >
                <ForgotPassword mobile={mobileSelector} />
                <span onClick={() => handleEditingModal("password")}>
                  Change Password
                </span>
              </div>
            </div>
            <div className={styles.sections}>
              <div className={styles.headingSection}>
                <StopCircle />
                <span>Delivery Address</span>
              </div>
              <div className={styles.inputControlContainer}>
                <InputControl
                  label={`Street address`}
                  placeholder="house no./ Street no./ landmark"
                />
              </div>
              <div className={styles.inputControlContainer}>
                <InputControl
                  label={`Address`}
                  placeholder="city/state/country"
                />
              </div>
            </div>
            <div className={[styles.sections, styles.lastSection].join(" ")}>
              <div className={styles.headingSection}>
                <StopCircle />
              </div>
            </div>
          </div>
        </div>
      </div>
      {changeInfo?.type === "mobile" ? (
        <Modal onClose={closeEditingModal}>{changeMobile}</Modal>
      ) : changeInfo?.type === "password" ? (
        <Modal onClose={closeEditingModal}>{changePassword}</Modal>
      ) : (
        ""
      )}
    </div>
  );
}

ProfileComponent.propTypes = {
  fname: PropTypes.string,
  lname: PropTypes.string,
  mobile: PropTypes.string,
  email: PropTypes.string,
};

export default ProfileComponent;
