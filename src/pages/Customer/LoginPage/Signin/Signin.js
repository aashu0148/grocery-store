import React from "react";
import styles from "./SignIn.module.scss";
import bgSignin from "assets/bgSignin.svg";
import Button from "components/Button/Button";
const Signin = (props) => {
  
  return (
    <div className={styles.container}>
      <div className={styles.picturePortion}>
        <img
          src={bgSignin}
          alt="SignIn background"
          className={styles.bgImage}
        />
      </div>
      <div className={styles.formPortion}>
        <form className={styles.form}>
          <h3>Sign in</h3>
          <hr />
          <label htmlFor="number">
            <h4>Number</h4>
            <input
            type="tel"
            maxLength="10"
            className="basic-input"
            
          />
          </label>
          <label htmlFor="number">
            <h4>otp</h4>
            <input
            type="tel"
            maxLength="10"
            className="basic-input"
            
          />
          </label>
          <Button type={props.bordered} className={"button-outline"}></Button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
