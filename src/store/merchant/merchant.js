import { IS_MERCHANT_LOGGED } from "store/ActionTypes";

const initialState = {
  auth: false,
  firstName: "",
  lastName: "",
  mobile: "",
};

const merchantReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_MERCHANT_LOGGED: {
      return {
        ...state,
        auth: action.merchantAuth,
        firstName: action.merchantFirstName,
        lastName: action.merchantLastName,
        mobile: action.merchantMobile,
      };
    }
    default:
      return state;
  }
};

export default merchantReducer;
