import React from "react";

import ProfileComponent from "components/ProfileComponent/ProfileComponent";

import styles from "./Profile.module.scss";

function Profile() {
  return (
    <div className={styles.profile}>
      <ProfileComponent />
    </div>
  );
}

export default Profile;
