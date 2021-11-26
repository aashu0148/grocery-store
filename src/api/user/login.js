import axios from "axios";
import { axiosConfig } from "utils/constants";
import { errorToastLogger } from "utils/util";

const backendApiUrl = process.env.REACT_APP_BACKEND_APP_URL;

export const checkMobile = async (mobile) => {
  try {
    const reqUrl = `${backendApiUrl}/user/auth/checkMobile/${mobile}`;
    const result = await axios.get(reqUrl, axiosConfig);

    return result.data;
  } catch (error) {
    errorToastLogger(error);
    return false;
  }
};
export const checkRegisterDetails = async (mobile) => {
  try {
    const reqUrl = `${backendApiUrl}/user/auth/check-register-details`;
    const result = await axios.post(reqUrl, axiosConfig);

    return result.data;
  } catch (error) {
    errorToastLogger(error);
    return false;
  }
};
export const login = async (mobile) => {
  try {
    const reqUrl = `${backendApiUrl}/user/auth/login`;
    const result = await axios.post(reqUrl, axiosConfig);
    return result.data;
  } catch (error) {
    errorToastLogger(error);
    return false;
  }
};
