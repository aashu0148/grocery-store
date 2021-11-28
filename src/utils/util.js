import toast from "react-hot-toast";

import { mobileRegex, emailRegex, otpRegex } from "./constants";

let debounceTimer;

export const errorToastLogger = (error, message) => {
  if (message) toast.error(message);
  else {
    const errorMessage = error?.message ? error.message : error + "";
    toast.error(errorMessage);
  }
};

export const validateEmail = (email) => {
  if (!email) return false;
  if (emailRegex.test(email.toLowerCase())) return true;
  else return false;
};

export const validateMobile = (mobile) => {
  if (!mobile) return false;
  if (mobileRegex.test(mobile)) return true;
  else return false;
};

export const validateOtp = (otp) => {
  if (!otp) return false;
  if (otpRegex.test(otp)) return true;
  else return false;
};

export const validatePassword = (password) => {
  if (!password) return false;
  if (password.length < 6) {
    return false;
  }
  if (password.search(/[a-z]/i) < 0) {
    return false;
  }
  if (password.search(/[0-9]/) < 0) {
    return false;
  } else return true;
};

export const debounce = (func, timer = 200) => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(func, timer);
};
