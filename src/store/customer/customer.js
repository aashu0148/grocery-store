import { CUSTOMER_LOGOUT, IS_CUSTOMER_LOGGED } from "store/actionTypes";

const initialState = {
  auth: false,
};
const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_CUSTOMER_LOGGED: {
      return {
        ...state,
        auth: action.customerAuth,
        firstName: action.customerFirstName,
        lastName: action.customerLastName,
        mobile: action.customerMobile,
      };
    }
    case CUSTOMER_LOGOUT: {
      return {
        auth: false,
      };
    }
    default:
      return state;
  }
};

export default customerReducer;
