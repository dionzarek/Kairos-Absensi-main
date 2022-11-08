import { combineReducers } from "redux";

import loginReducer from "./authReducer";

const reducer = combineReducers({
  auth: loginReducer,
});

export default reducer;
