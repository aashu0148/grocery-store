import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import toast from "react-hot-toast";

import { errorToastLogger, validateMobile } from "./util";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
  measurementId: process.env.REACT_APP_FIREBASE_measurementId,
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const auth = getAuth();
auth.useDeviceLanguage();

export const imageUpload = (
  file,
  progressCallback,
  downloadCallback,
  errorCallback
) => {
  if (!file) {
    if (errorCallback) errorCallback("Image not found");
    return;
  }
  const fileSize = file.size / 1024 / 1024;
  const fileType = file.type;

  if (!fileType.includes("image")) {
    if (errorCallback) errorCallback("File must be image only");
    return;
  }
  if (fileSize > 2) {
    if (errorCallback) errorCallback("Image must be smaller than 2 MB");
    return;
  }

  const storageRef = ref(storage, `images/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progressCallback) progressCallback(progress);
    },
    (error) => {
      if (errorCallback) errorCallback(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        if (downloadCallback) downloadCallback(downloadURL);
      });
    }
  );
};

async function fireBaseCaptchVerification() {
  try {
    window.recaptchaVerifier = await new RecaptchaVerifier(
      "recaptcha",
      { size: "invisible" },
      auth
    );
  } catch (error) {
    errorToastLogger(
      error,
      "Re-captcha verification failed. Refresh the page and try again"
    );
    return;
  }
}

async function signInWithPhone(mobile) {
  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      mobile,
      window.recaptchaVerifier
    );
    toast.success("Otp sent successfully");
    return confirmationResult;
  } catch (error) {
    errorToastLogger(error, error.message);
    return;
  }
}

export const sendOtp = async (mobile) => {
  if (!mobile) return false;
  if (!validateMobile(mobile)) return false;

  await fireBaseCaptchVerification();

  if (window.recaptchaVerifier) {
    return await signInWithPhone("+91" + mobile);
  }
};

export const verifyOtp = async (confirmationResult, otp) => {
  try {
    if (!confirmationResult || !otp) return false;
    const user = confirmationResult.confirm(otp);

    toast.success("OTP verified successfully");
    return user;
  } catch (error) {
    errorToastLogger(error, "Otp verification failed.");
    return "";
  }
};

export default app;
