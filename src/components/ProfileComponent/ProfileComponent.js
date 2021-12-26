import React, { useState, useRef } from "react";
import { StopCircle, Edit } from "react-feather";

import Button from "components/Button/Button";

import { validateMobile } from "utils/util";

import styles from "./ProfileComponent.module.scss";
import InputControl from "components/InputControl/InputControl";
import Modal from "components/Modal/Modal";
import VerifyOtp from "components/verifyOtp/VerifyOtp";

function ProfileComponent() {
  const [profileUrl, setProfileUrl] = useState(
    "https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
  );

  const [errorMsg, setErrorMsg] = useState("");
  const [isChangeMobileOtpSent, setIsChangeMobileOtpSent] = useState(false);
  const [newMobile, setNewMobile] = useState("");
  const [changeInfo, setChangeInfo] = useState({ type: "" });
  const newMobileRef = useRef();
  const profileInputRef = useRef();

  const avatars = [
    {
      url: "https://cdn.iconscout.com/icon/free/png-128/user-1909-879837.png",
    },
    {
      url: "https://cdn-icons-png.flaticon.com/128/265/265674.png",
    },
    {
      url: "https://cdn-icons.flaticon.com/png/512/547/premium/547590.png?token=exp=1639916534~hmac=7bd46cc442e12bf6738084132333a91b",
    },
    {
      url: "https://cdn.iconscout.com/icon/free/png-128/user-1908-879836.png",
    },
    {
      url: "https://cdn.iconscout.com/icon/free/png-128/avatar-1253-879841.png",
    },
    {
      url: "https://cdn-icons.flaticon.com/png/512/122/premium/122491.png?token=exp=1639916493~hmac=ed4e8eda5da132cdc1132a2454e9a69a",
    },
    {
      url: "https://cdn-icons-png.flaticon.com/128/2922/2922561.png",
    },
    {
      url: "https://cdn.iconscout.com/icon/free/png-128/woman-1285-879839.png",
    },
  ];

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
  };

  const removeAvatar = () => {
    setProfileUrl(
      "https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
    );
  };

  const imageUploadHandler = () => {
    console.log(profileInputRef.current.files);
  };

  // const changePassword = (
  //   <div className={styles.changeDetailModal}>
  //     <InputControl label={`New passwerd`} />
  //     <InputControl label={`Confirm password`} />
  //     <div className={styles.buttonContainer}>
  //       <Button>Done</Button>
  //       <Button delete onClick={closeEditingModal}>
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
            <Button delete onClick={closeEditingModal}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );

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
              <img src={profileUrl} alt="avatar" />
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
              {avatars?.map((avatar, index) => (
                <div
                  className={styles.avatar}
                  onClick={() => handleAvatar(avatar.url)}
                  key={index}
                >
                  <img src={avatar.url} alt="avatar" />
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
