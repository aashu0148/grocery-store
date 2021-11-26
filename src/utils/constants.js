export const userTypes = {
  customer: "customer",
  merchant: "merchant",
};

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const mobileRegex = /^[0-9]{10}$/;

export const otpRegex = /^[0-9]{6}$/;

export const authLeftPanelImage =
  "https://image.shutterstock.com/z/stock-vector-set-of-fruit-and-vegetables-logo-for-groceries-agriculture-stores-packaging-and-advertising-318421853.jpg";

const authenticatingToken = localStorage.getItem("token");
export const axiosConfig = {
  headers: { Authorization: `${authenticatingToken}` },
};
