import { combineReducers } from "redux";

import customerReducer from "./customer/customer";
import merchantReducer from "./merchant/merchant";

export default combineReducers({
  customerReducer,
  merchantReducer,
});
