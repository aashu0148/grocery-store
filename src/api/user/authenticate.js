import axios from "axios";
import { axiosConfig } from "utils/constants";

const backendApiUrl = process.env.REACT_APP_BACKEND_APP_URL;

export const checkAuth = async () => {
  try {
    const reqUrl = `${backendApiUrl}/user/auth/authenticate`;
    const result = await axios.get(reqUrl, axiosConfig);

    if (!result.data?.status) {
      return false;
    } else {
      return result.data;
    }
  } catch (error) {
    return false;
  }
};
