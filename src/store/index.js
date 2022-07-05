import {
  CHANGE_MOBILE_VIEW,
  IS_USER_LOGGED,
  USER_LOGOUT,
  CHANGE_MOBILE,
  UPDATE_PROFILE,
} from "store/actionTypes";

const initialState = {
  auth: false,
  isMobileView: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_USER_LOGGED: {
      return {
        ...state,
        auth: action.auth,
        userId: action.userId,
        firstName: action.firstName,
        lastName: action.lastName,
        mobile: action.mobile,
        profileImage: action.profileImage,
        email: action.email,
        deliveryAddress: action.deliveryAddress,
        refLocation: action.refLocation,
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
    case CHANGE_MOBILE: {
      return {
        ...state,
        mobile: action.mobile,
      };
    }
    case UPDATE_PROFILE: {
      return {
        ...state,
        firstName: action.firstName,
        lastName: action.lastName,
        mobile: action.mobile,
        email: action.email,
        deliveryAddress: action.deliveryAddress,
        refLocation: action.refLocation,
        profileImage: action.profileImage,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
