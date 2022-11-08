import { loginAxios } from "../../utility/auth";
import { LOGIN, LOGOUT } from "./actionString";

export const loginAction = (body) => {
  return {
    type: LOGIN,
    payload: loginAxios(body),
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};
