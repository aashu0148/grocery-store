import { IS_USER_LOGGED, USER_LOGOUT } from "store/actionTypes";

const initialState = {
  auth: false,
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
      };
    }
    case USER_LOGOUT: {
      return {
        auth: false,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
