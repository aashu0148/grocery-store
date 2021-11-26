import toast from "react-hot-toast";

import { mobileRegex, emailRegex, otpRegex } from "./constants";

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
