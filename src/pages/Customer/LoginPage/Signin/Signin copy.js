import React from "react";
import styles from "./SignIn.module.scss";

const Signin = () => {
  // const [number, setNumber] = useState("");
  // const [otp, setOtp] = useState("");
  // const [errMsg, seterrMsg] = useState({
  //   number: "",
  //   otp: "",
  // });
  // let numberValid, otpValid;
  // console.log(number);
  // const checkValidity = (item, type) => {
  //   const tempErr = {};
  //   switch (type) {
  //     case "number": {
  //       const numberValue = item.target.value;
  //       console.log(numberValue);
  //       setNumber(numberValue);
  //       if (numberValue.length !== 10) {
  //         numberValid = false;
  //         tempErr.number("Enter 10digit number.");
  //       } else if (!numberValue.match(/^([+]\d{0})?\d{10}$/)) {
  //         numberValid = false;
  //         tempErr.number("Number should be valid.");
  //       } else {
  //         numberValid = true;
  //         tempErr.number("");
  //       }
  //       break;
  //     }
  //     case "otp": {
  //       const otpValue = item.target.value;
  //       setOtp(otpValue);
  //       if (otpValue.length !== 6) {
  //         otpValid = false;
  //         tempErr.otp("Enter valid OTP!!!");
  //       } else {
  //         otpValid = true;
  //         tempErr.otp("");
  //       }
  //       break;
  //     }
  //     default: {
  //       return;
  //     }
  //   }

  //  seterrMsg(tempErr);
  // };

  // const submitForm = (event) => {
  //   event.preventDefault();
  //   if (!(numberValid && otpValid)) return;
  // };
  return (
    <div className={styles.container}>
      <h4>heell</h4>

      {/* <form onSubmit={submitForm}>
        <h3>Sign in</h3>
        <hr />
        <label htmlFor="number">
          <h4>Number</h4>
          <input
            type="tel"
            maxLength="10"
            className="basic-input"
            onChange={(event) => checkValidity(event, "number")}
            value={number}
          />
        </label>
        <small
          style={{
            color: "red",
            fontWeight: "bold",
            letterSpacing: "1px",
            backdropFilter: "blur(10px)",
            fontSize: "0.9rem",
          }}
          // ref={(el) => (errMsg = el)}
        ></small>
        <label htmlFor="Otp">
          <h4>Otp</h4>
          <input
            type="tel"
            maxLength="6"
            className="basic-input"
            onChange={(event) => checkValidity(event, "otp")}
            value={otp}
          />
        </label>
      </form> */}
    </div>
  );
};

export default Signin;
