import axios from "axios";
import { axiosConfig } from "utils/constants";
import { errorToastLogger } from "utils/util";

const backendApiUrl = process.env.REACT_APP_BACKEND_APP_URL;

export const checkAuth = async () => {
  try {
    const reqUrl = `${backendApiUrl}/user/auth/authenticate`;
    const result = await axios.get(reqUrl, axiosConfig);

    if (!result.data?.status) {
      errorToastLogger("", result.data?.message);
      return false;
    } else {
      return result.data;
    }
  } catch (error) {
    errorToastLogger(error, "Authentication Error");
    return false;
  }
};
