import axios from "axios";
import { errorToastLogger } from "utils/util";

const backendApiUrl = process.env.REACT_APP_BACKEND_APP_URL;

export const getAllProducts = async (filters, page) => {
  try {
    const reqUrl = `${backendApiUrl}/user/product/all?search=${
      filters?.search || ""
    }&refCategory=${filters?.refCategory || ""}&refSubCategory=${
      filters?.refSubCategory || ""
    }&sortBy=${filters?.sortBy || ""}&minimumPrice=${
      filters?.minimumPrice || ""
    }&maximumPrice=${filters?.maximumPrice || ""}&pageNumber=${page || ""}`;
    const result = await axios.get(reqUrl);

    if (!result.data?.status) {
      errorToastLogger("", result.data?.message);
      return false;
    } else {
      return result.data;
    }
  } catch (error) {
    errorToastLogger(error, "Failed to get products");
    return false;
  }
};
