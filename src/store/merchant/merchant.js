const initialState = {
  name: "",
  merchantAuth: false,
  currMerchant: {},
};

const merchantReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_MERCHANT_LOGGED": {
      return {
        ...state,
        merchantAuth: action.merchantAuth,
        currMerchant: action.currMerchant,
      };
    }
    default:
      return state;
  }
};

export default merchantReducer;
