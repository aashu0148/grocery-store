import toast from "react-hot-toast";

import { mobileRegex, emailRegex, otpRegex } from "./constants";

export const errorToastLogger = (error, message) => {
  if (error?.response?.data?.message) {
    toast.error(error?.response?.data?.message);
  } else {
    if (message) toast.error(message);
    else {
      const errorMessage = error?.message ? error.message : error + "";
      toast.error(errorMessage);
    }
  }
  console.error(error);
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

export const validateImage = (file, size = 2) => {
  if (!file) return { status: false, message: "File not selected" };

  const fileType = file.type.split("/").pop().toLowerCase();
  const fileSizeInMb = file.size / 1024 / 1024;
  if (
    fileType !== "jpeg" &&
    fileType !== "jpg" &&
    fileType !== "png" &&
    fileType !== "gif"
  )
    return { status: false, message: "Select a valid image." };

  if (fileSizeInMb > size)
    return { status: false, message: `Image must me smaller than ${size} MB` };

  return { status: true, message: `Image is valid` };
};
