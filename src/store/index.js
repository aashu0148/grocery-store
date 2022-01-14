import {
  CHANGE_MOBILE_VIEW,
  IS_USER_LOGGED,
  USER_LOGOUT,
} from "store/actionTypes";

const initialState = {
  auth: false,
  isMobileView: false,
  isMerchant: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_USER_LOGGED: {
      return {
        ...state,
        auth: action.auth,
        firstName: action.firstName,
        lastName: action.lastName,
        mobile: action.mobile,
        avatar: action.avatar,
        email: action.email,
        isMerchant: action.isMerchant || false,
      };
    }
    case USER_LOGOUT: {
      return {
        auth: false,
        isMobileView: state.isMobileView,
        isMerchant: false,
      };
    }
    case CHANGE_MOBILE_VIEW: {
      return {
        ...state,
        isMobileView: action.isMobileView,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
