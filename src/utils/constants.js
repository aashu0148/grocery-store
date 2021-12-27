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

export const avatarLinks = [
  "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/avatars%2Fmen.png?alt=media&token=77799a0d-5439-4845-abbd-e076b152c2be",
  "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/avatars%2Fmen2.png?alt=media&token=d4eeabbc-2a22-4400-bb6f-2e7536181683",
  "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/avatars%2Fmen3.png?alt=media&token=e1bfeb18-59b5-47b5-86c8-fdcd9c73545a",
  "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/avatars%2Fmen4.png?alt=media&token=b92ae05b-6e85-40ea-b182-6556d7fb930e",
  "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/avatars%2Fmen5.png?alt=media&token=61d94722-a6d7-42f3-9f59-acd27b0f5fa1",
  "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/avatars%2Fmen6.png?alt=media&token=b49677d5-5a20-493c-9060-82c039c69715",
  "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/avatars%2Fwomen.png?alt=media&token=8e14ab0e-4352-453a-ba09-4d270dfcf2de",
  "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/avatars%2Fwomen2.png?alt=media&token=9cfb1731-ab2d-4f4e-b6b9-bdfa311ec5a5",
  "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/avatars%2Fwomen3.png?alt=media&token=67570ec8-2234-45bc-b77b-fd05f6f3e499",
  "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/avatars%2Fwomen4.png?alt=media&token=283ce989-2cb3-4948-9d2f-62d45a97e051",
  "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/avatars%2Fwomen5.png?alt=media&token=dfb5fdc2-f468-43e7-a941-699b9c006b31",
  "https://firebasestorage.googleapis.com/v0/b/grocery0store.appspot.com/o/avatars%2Fwomen6.png?alt=media&token=c687fde2-e4e3-4867-a3df-363857c8fee5",
];

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
