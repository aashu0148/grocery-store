import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { StopCircle, Folder } from "react-feather";
import { useSelector, useDispatch } from "react-redux";

import { validateMobile } from "utils/util";
import { getAvatarLink } from "api/user/avatar";
import { updateProfile } from "api/user/profile";
import { CHANGE_MOBILE, UPDATE_PROFILE } from "store/actionTypes";

import Button from "components/Button/Button";
import ImagePreview from "components/ImagePreview/ImagePreview";
import InputControl from "components/InputControl/InputControl";
import Modal from "components/Modal/Modal";
import VerifyOtp from "components/verifyOtp/VerifyOtp";
import ForgotPassword from "components/ForgotPassword/ForgotPassword";
import Spinner from "components/Spinner/Spinner";

import styles from "./ProfileComponent.module.scss";

function ProfileComponent() {
  const firstNameSelector = useSelector((state) => state.firstName);
  const lastNameSelector = useSelector((state) => state.lastName);
  const mobileSelector = useSelector((state) => state.mobile);
  const emailSelector = useSelector((state) => state.email);
  const profileImageSelector = useSelector((state) => state.profileImage);
  const deliveryAddress = useSelector((state) => state.deliveryAddress);
  const refLocation = useSelector((state) => state.refLocation);
  const dispatch = useDispatch();

  const [details, setDetails] = useState({
    firstName: firstNameSelector,
    lastName: lastNameSelector,
    mobile: mobileSelector,
    email: emailSelector,
    profileImage: profileImageSelector,
    deliveryAddress: deliveryAddress,
    refLocation: refLocation,
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isChangeMobileOtpSent, setIsChangeMobileOtpSent] = useState(false);
  const [newMobile, setNewMobile] = useState("");
  const [mobileOrPass, setmobileOrPass] = useState({ type: "" });
  const [file, setFile] = useState("");
  const [avatarUrl, setAvatarUrl] = useState({
    men: [],
    women: [],
  });
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [showOverlaySpinner, setShowOverlaySpinner] = useState(false);
  const newMobileRef = useRef();
  const profileInputRef = useRef();

  const handleEditingModal = (type) => {
    setmobileOrPass({
      type: type,
    });
  };

  const closeEditingModal = () => {
    setmobileOrPass({
      type: "",
    });
    setErrorMsg("");
    setIsChangeMobileOtpSent(false);
    setNewMobile("");
  };

  const handleChangeDetails = (event, valueName) => {
    const dummyDetails = { ...details };
    dummyDetails[valueName] = event.target.value;
    setDetails(dummyDetails);
  };

  const handleUpdateProfile = () => {
    setSubmitButtonDisabled(true);
    updateProfile(details).then((res) => {
      if (!res) return;
      toast.success(res.message);
      dispatch({
        type: UPDATE_PROFILE,
        firstName: details.firstName,
        lastName: details.lastName,
        email: details.email,
        deliveryAddress: details.deliveryAddress,
        refLocation: details.refLocation,
        mobile: details.mobile,
        profileImage: details.profileImage,
      });
      setSubmitButtonDisabled(false);
    });
  };

  const handleChangeMobileNumber = () => {
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
  const handleMobileOnFrontend = () => {
    setDetails({ ...details, mobile: newMobile });

    updateProfile({ mobile: newMobile }).then((res) => {
      if (!res) return;
      dispatch({
        type: CHANGE_MOBILE,
        newMobile: newMobile,
      });
      setSubmitButtonDisabled(false);
    });
    closeEditingModal();
  };

  const handleChangePassword = () => {
    //will do it later when api will be ready
  };

  const handleAvatar = (url) => {
    if (!url || url === details?.profileImage) return;
    setShowOverlaySpinner(true);
    setDetails({ ...details, profileImage: url });
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
    <div>
      {isChangeMobileOtpSent ? (
        <VerifyOtp
          isBackgroundTransparent={true}
          mobile={newMobile}
          onSuccess={handleMobileOnFrontend}
        />
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

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h2>My Profile</h2>
        <Button onClick={handleUpdateProfile} disabled={submitButtonDisabled}>
          Save
          {submitButtonDisabled && <Spinner small white />}
        </Button>
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
                    src={
                      typeof file === "object" ? null : details?.profileImage
                    }
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
                  value={details?.firstName}
                  onChange={(event) => handleChangeDetails(event, "firstName")}
                />
                <InputControl
                  label="Last name"
                  placeholder="Enter last name"
                  value={details?.lastName}
                  onChange={(event) => handleChangeDetails(event, "lastName")}
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
                  value={details?.email}
                  onChange={(event) => handleChangeDetails(event, "email")}
                  placeholder="Enter email"
                />
              </div>
              <div className={styles.inputControlContainer}>
                <InputControl
                  label="Mobile"
                  placeholder="Enter Mobile number"
                  value={details?.mobile}
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
                  value={details?.deliveryAddress}
                  onChange={(event) =>
                    handleChangeDetails(event, "deliveryAddress")
                  }
                />
              </div>
              <div className={styles.inputControlContainer}>
                <InputControl
                  label={`Address`}
                  placeholder="city/state/country"
                  value={details?.refLocation}
                  onChange={(event) =>
                    handleChangeDetails(event, "refLocation")
                  }
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
      {mobileOrPass?.type === "mobile" ? (
        <Modal onClose={closeEditingModal}>{changeMobile}</Modal>
      ) : mobileOrPass?.type === "password" ? (
        <Modal onClose={closeEditingModal}>{changePassword}</Modal>
      ) : (
        ""
      )}
    </div>
  );
}

ProfileComponent.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  mobile: PropTypes.string,
  email: PropTypes.string,
};

export default ProfileComponent;
