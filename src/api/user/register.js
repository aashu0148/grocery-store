import axios from "axios";
// import { axiosConfig } from "utils/constants";
import { errorToastLogger } from "utils/util";

const backendApiUrl = process.env.REACT_APP_BACKEND_APP_URL;

export const checkRegisterDetails = async (body) => {
  try {
    const reqUrl = `${backendApiUrl}/user/auth/check-register-details`;
    const result = await axios.post(reqUrl, body);

    if (!result.data?.status) {
      errorToastLogger("", result.data?.message);
      return false;
    } else {
      return result.data;
    }
  } catch (error) {
    errorToastLogger(error, "Request failed for Email");
    return false;
  }
};

export const register = async (body) => {
  try {
    const reqUrl = `${backendApiUrl}/user/auth/register`;
    const result = await axios.post(reqUrl, body);

    if (!result.data?.status) {
      errorToastLogger("", result.data?.message);
      return false;
    } else {
      return result.data;
    }
  } catch (error) {
    errorToastLogger(error, "Failed to register");
    return false;
  }
};
