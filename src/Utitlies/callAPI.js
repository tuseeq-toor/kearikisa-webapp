import axios from "axios";
import Store from "./../Component/Store";

export const callApi = (
  endpoint,
  method,
  payload,
  id,
  token,
  callFrom,
  refreshToken
) => {
  let usertoken =
    (Store.getState().logIn && Store.getState().logIn.payload) || token;

  let headerProp = refreshToken ? "token" : "authorization";
  const configaxios = {
    method,
    url:
      callFrom === "Admin"
        ? `${process.env.REACT_APP_URL_ADMIN}${endpoint}`
        : `${process.env.REACT_APP_URL_USER}${endpoint}`,
    data: payload,
    headers: {
      Accept: "*/*",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Max-Age": "6000",
      "Access-Control-Allow-Headers": "*",
      [headerProp]: usertoken,
    },
  };
  return new Promise((resolve, reject) => {
    axios(configaxios)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
