import React from "react";

import image from "assets/images/leftPanelImage.png";

import styles from "./LoginInfo.module.scss";

function LoginInfo() {
  return (
    <div className={styles.container}>
      <img src={image} alt="Grocery" className={styles.mainImage} />

      <div className={styles.innerContainer}>
        <h1>Buy Best</h1>
        <h2>Buy healthy</h2>
        <p>1000+ Products available</p>
      </div>
    </div>
  );
}

export default LoginInfo;
