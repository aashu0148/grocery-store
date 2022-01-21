export const userTypes = {
  customer: "customer",
  merchant: "merchant",
};

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const mobileRegex = /^[0-9]{10}$/;

export const otpRegex = /^[0-9]{6}$/;

const authenticatingToken = JSON.parse(localStorage.getItem("token"));
export const axiosConfig = {
  headers: { Authorization: `${authenticatingToken}` },
};

export const sortingOptions = [
  {
    value: "discount",
    label: "Discount",
  },
  {
    value: "price-a",
    label: "Price ( low to high )",
  },
  {
    value: "price-d",
    label: "Price ( high to low )",
  },
];
