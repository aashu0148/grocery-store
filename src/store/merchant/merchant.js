import { IS_MERCHANT_LOGGED, MERCHANT_LOGOUT } from "store/actionTypes";

const initialState = {
  auth: false,
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
        email: action.merchantEmail,
      };
    }
    case MERCHANT_LOGOUT: {
      return {
        auth: false,
      };
    }
    default:
      return state;
  }
};

export default merchantReducer;
