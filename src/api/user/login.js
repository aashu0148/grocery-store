import axios from "axios";
import { axiosConfig } from "utils/constants";
import { errorToastLogger } from "utils/util";

const backendApiUrl = process.env.REACT_APP_BACKEND_APP_URL;

export const checkMobile = async (mobile) => {
  try {
    const reqUrl = `${backendApiUrl}/user/auth/checkMobile/${mobile}`;
    const result = await axios.get(reqUrl, axiosConfig);

    if (!result.data?.status) {
      errorToastLogger("", result.data?.message);
      return false;
    } else {
      return result.data;
    }
  } catch (error) {
    errorToastLogger(error, "Request failed to Mobile number");
    return false;
  }
};

export const login = async (body) => {
  try {
    const reqUrl = `${backendApiUrl}/user/auth/login`;
    const result = await axios.post(reqUrl, body);

    if (!result.data?.status) {
      errorToastLogger("", result.data?.message);
      return false;
    } else {
      return result.data;
    }
  } catch (error) {
    errorToastLogger(error, "Login failed");
    return false;
  }
};
