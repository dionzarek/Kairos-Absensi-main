import axios from "axios";

export const loginAxios = (body) => {
  const URL = `${process.env.REACT_APP_HOST}/api/auth/login`;
  return axios.post(URL, body);
};
