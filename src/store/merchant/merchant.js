const initialState = {
  auth: false,
  name: "",
  mobile: "",
};

const merchantReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_MERCHANT_LOGGED": {
      return {
        ...state,
        auth: action.merchantAuth,
        name: action.merchantName,
        mobile: action.merchantMobile,
      };
    }
    default:
      return state;
  }
};

export default merchantReducer;
