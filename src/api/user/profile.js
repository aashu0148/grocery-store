import axios from "axios";
import { axiosConfig } from "utils/constants";
import { errorToastLogger } from "utils/util";

const backendApiUrl = process.env.REACT_APP_BACKEND_APP_URL;

export const updateProfile = async (body) => {
  try {
    const reqUrl = `${backendApiUrl}/user/auth/update`;
    const result = await axios.post(reqUrl, body, axiosConfig);

    if (!result.data?.status) {
      errorToastLogger("", result.data?.message);
      return false;
    } else {
      return result.data;
    }
  } catch (error) {
    errorToastLogger(error, "Failed to update details");
    return false;
  }
};
