import axios from "axios";
import { axiosConfig } from "utils/constants";
import { errorToastLogger } from "utils/util";

const backendApiUrl = process.env.REACT_APP_BACKEND_APP_URL;

export const getWishlist = async () => {
  try {
    const reqUrl = `${backendApiUrl}/user/wishlist`;
    const result = await axios.get(reqUrl, axiosConfig);

    if (!result.data?.status) {
      errorToastLogger("", result.data?.message);
      return false;
    } else {
      return result.data;
    }
  } catch (error) {
    errorToastLogger(error, "Failed to get wishlist");
    return false;
  }
};

export const addToWishlist = async (productId) => {
  try {
    const reqUrl = `${backendApiUrl}/user/wishlist/add/${productId}`;
    const result = await axios.get(reqUrl, axiosConfig);

    if (!result.data?.status) {
      errorToastLogger("", result.data?.message);
      return false;
    } else {
      return result.data;
    }
  } catch (error) {
    errorToastLogger(error, "Failed to add to wishlist");
    return false;
  }
};

export const deleteFromWishlist = async (productId) => {
  try {
    const reqUrl = `${backendApiUrl}/user/wishlist/delete/${productId}`;
    const result = await axios.get(reqUrl, axiosConfig);

    if (!result.data?.status) {
      errorToastLogger("", result.data?.message);
      return false;
    } else {
      return result.data;
    }
  } catch (error) {
    errorToastLogger(error, "Failed to delete wishlist");
    return false;
  }
};
