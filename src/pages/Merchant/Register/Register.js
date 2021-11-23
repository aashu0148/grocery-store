import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Register.module.scss";

import Button from "components/Button/Button";
import InputControl from "components/InputControl/InputControl";

function Register() {
  const [errors, setErrors] = useState({});

  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const passRef = useRef();
  const confirmpassRef = useRef();

  // const ValidateEmail = (mail) => {
  //   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
  //     return true;
  //   }
  //   return false;
  // };

  // const validateInputs = (value, name) => {
  //   if (value === "") {
  //     const dummyErrors = {};
  //     dummyErrors.name = `Enter ${name}`;
  //     setErrors(dummyErrors);
  //     return;
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // validateInputs(fnameRef.current.value, "fname");
    // validateInputs(lnameRef.current.value, "lname");
    // validateInputs(mobileRef.current.value, "mobile");
    // validateInputs(passRef.current.value, "password");
    // validateInputs(confirmpassRef.current.value, "confirmpass");
    // validateInputs(emailRef.current.value, "email");
    // if (!ValidateEmail(emailRef.current.value)) {
    //   return;
    // }
  };

  const navigate = useNavigate();
  const changeURl = () => {
    navigate("/login");
  };

  return (
    <div className={styles.register}>
      <div className={styles.registerLeftPanel}>
        <h1>Buy Best!</h1>
        <span>100+ products available at best price</span>
        <img
          className={styles.registerLeftPanelImage}
          src="https://image.shutterstock.com/z/stock-vector-set-of-fruit-and-vegetables-logo-for-groceries-agriculture-stores-packaging-and-advertising-318421853.jpg"
        ></img>
        <div className={styles.registerLeftPanelIcons}></div>
      </div>
      <div className={styles.registerRightPanel}>
        <form onSubmit={handleSubmit}>
          <div className={styles["registerRightPanel-mainBody"]}>
            <h2>Create an account</h2>
            <div className={styles["registerRightPanel-inputContainer"]}>
              <div className={styles["registerRightPanel-inputWrapper"]}>
                <InputControl
                  placeholder="Enter first name"
                  label="First name"
                  ref={fnameRef}
                  error={errors?.fname}
                />
              </div>
              <div className={styles["registerRightPanel-inputWrapper"]}>
                <InputControl
                  label="Last name"
                  placeholder="Enter last name"
                  ref={lnameRef}
                  error={errors?.lname}
                />
              </div>
            </div>
            <div className={styles["registerRightPanel-inputWrapper"]}>
              <InputControl
                placeholder="Enter mobile number"
                label="Mobile number"
                ref={mobileRef}
                error={errors?.mobile}
              />
            </div>
            <div className={styles["registerRightPanel-inputWrapper"]}>
              <InputControl
                label="Email"
                placeholder="Enter email"
                ref={emailRef}
                error={errors?.email}
              />
            </div>
            <div className={styles["registerRightPanel-inputContainer"]}>
              <div className={styles["registerRightPanel-inputWrapper"]}>
                <InputControl
                  password="true"
                  placeholder="Enter password"
                  label="Password"
                  ref={passRef}
                  error={errors?.pass}
                />
              </div>
              <div className={styles["registerRightPanel-inputWrapper"]}>
                <InputControl
                  placeholder={`Confirm Password`}
                  label={`Confirm Password`}
                  ref={confirmpassRef}
                  errors={errors?.confirmpass}
                  password="true"
                />
              </div>
            </div>
            <span
              className={styles["registerRightPanel_helper-text"]}
              onClick={changeURl}
            >
              Already have an account!
            </span>
            <Button type={`submit`}>Create Account</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
