import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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

export default app;
