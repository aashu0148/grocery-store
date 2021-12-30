import React, { useState, useRef, useEffect } from "react";
import { StopCircle, Edit } from "react-feather";

import { validateMobile } from "utils/util";
import { getAvatarLink } from "api/user/avatar";

import Button from "components/Button/Button";
import ImagePreview from "components/ImagePreview/ImagePreview";
import InputControl from "components/InputControl/InputControl";
import Modal from "components/Modal/Modal";
import VerifyOtp from "components/verifyOtp/VerifyOtp";

import styles from "./ProfileComponent.module.scss";

function ProfileComponent() {
  const [profileUrl, setProfileUrl] = useState(
    "https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [isChangeMobileOtpSent, setIsChangeMobileOtpSent] = useState(false);
  const [newMobile, setNewMobile] = useState("");
  const [changeInfo, setChangeInfo] = useState({ type: "" });
  const [file, setFile] = useState("");
  const [avatarUrl, setAvatarUrl] = useState({
    men: [],
    women: [],
  });
  const newMobileRef = useRef();
  const profileInputRef = useRef();

  const closeEditingModal = () => {
    setChangeInfo({
      type: "",
    });
    setErrorMsg("");
  };

  const handleChangeMobileNumber = () => {
    if (!newMobileRef.current.value) {
      setErrorMsg("Enter new number");
      return;
    }
    setErrorMsg("");
    if (!validateMobile(newMobileRef.current.value)) {
      setErrorMsg("enter valid mobile number");
      return;
    }
    setNewMobile(newMobileRef.current.value);
    setIsChangeMobileOtpSent(true);
  };

  const handleEditingModal = (type) => {
    setChangeInfo({
      type: type,
    });
  };

  const handleAvatar = (url) => {
    if (!url) return;
    setProfileUrl(url);
    setFile("");
  };

  const removeAvatar = () => {
    setProfileUrl(
      "https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
    );
    setFile("");
  };

  const imageUploadHandler = () => {
    setFile(profileInputRef.current.files[0]);
  };

  // const changePassword = (
  //   <div className={styles.changeDetailModal}>
  //     <InputControl label={`New passwerd`} />
  //     <InputControl label={`Confirm password`} />
  //     <div className={styles.buttonContainer}>
  //       <Button>Done</Button>
  //       <Button cancel onClick={closeEditingModal}>
  //         Cancel
  //       </Button>
  //     </div>
  //   </div>
  // );

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

  useEffect(() => {
    getAvatarLink().then((res) =>
      setAvatarUrl({
        men: res?.data?.men,
        women: res?.data?.women,
      })
    );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h2>My Profile</h2>
        <Button>Save</Button>
      </div>

      <div className={styles.profile}>
        <div className={styles.leftMainContainer}>
          <div className={styles.left}>
            <div className={styles.profile_image}>
              {console.log(file, profileUrl)}
              <ImagePreview
                className={styles.additionalStyle}
                large
                isDeleteIcon={true}
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
                <Edit />
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
            <div className={styles.buttonContainer}>
              <Button delete onClick={removeAvatar}>
                Remove Profile
              </Button>
            </div>
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
                  label={`First name`}
                  placeholder="Enter first name"
                />
                <InputControl
                  label={`Last name`}
                  placeholder="Enter last name"
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
                  label={`Email`}
                  defaultValue={`0007nitishsharma@gmail.com`}
                  placeholder="Enter email"
                />
              </div>
              <div className={styles.inputControlContainer}>
                <InputControl
                  label={`Mobile`}
                  placeholder="Enter Mobile number"
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
              <div className={styles.inputControlContainer}>
                <p>Forgot password? </p>
                <span>Change Password</span>
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
      ) : (
        ""
      )}
    </div>
  );
}

export default ProfileComponent;
