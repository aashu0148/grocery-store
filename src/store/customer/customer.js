import { IS_CUSTOMER_LOGGED } from "store/actionTypes";

const initialState = {
  auth: false,
  firstName: "",
  lastName: "",
  mobile: "",
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
    default:
      return state;
  }
};

export default customerReducer;
