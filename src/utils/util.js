import toast from "react-hot-toast";

import { mobileRegex, emailRegex } from "./constants";

export const errorToastLogger = (error, message) => {
  if (message) toast.error(message);
  else toast.error(error);

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
