import axios from "axios";
import { errorToastLogger } from "utils/util";

const backendApiUrl = process.env.REACT_APP_BACKEND_APP_URL;

export const getAvatarLink = async () => {
  try {
    const reqUrl = `${backendApiUrl}/admin/avatar`;
    const result = await axios.get(reqUrl);
    if (!result.data?.status) {
      errorToastLogger("", result.data?.message);
      return false;
    } else {
      return result.data;
    }
  } catch (error) {
    errorToastLogger(error, "Failed to get avatars");
    return false;
  }
};
