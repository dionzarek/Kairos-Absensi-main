import {
  LOGIN,
  LOGOUT,
  PENDING,
  FULFILLED,
  REJECTED,
} from "../actionCreator/actionString";

const initialState = {
  loginInfo: {},
  isLoading: false,
  isLoggedIn: false,
  err: false,
  isSuccess: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN + PENDING:
      return { ...state, isLoading: true, isSuccess: null };
    case LOGIN + FULFILLED:
      return {
        ...state,
        err: false,
        loginInfo: action.payload.data.data,
        isLoading: false,
        isSuccess: true,
      };
    case LOGIN + REJECTED:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
        isSuccess: false,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
