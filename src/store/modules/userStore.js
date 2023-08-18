import { Login, LoginOut } from "../../API/login";
import Cookies from "js-cookie";
const state = {
  FantasyTimetoken: "",
};
const mutations = {
  SET_TOKEN: (state, result) => {
    state.FantasyTimetoken = result.FantasyTimetoken;
  },
};
const actions = {
  Login({ commit }, data) {
    // commit("SET_TOKEN", data);
    const { username, password } = data;
    return new Promise((resolve, reject) => {
      Login({ username: username.trim(), password: password })
        .then((response) => {
          if (response.code) {
            // setToken(result.token);
            var result = { FantasyTimetoken: response.data.FantasyTimetoken };
            sessionStorage.setItem(
              "FantasyTimetoken",
              response.data.FantasyTimetoken
            );
            sessionStorage.setItem("UserName", response.data.UserName);
            Cookies.set("FantasyTimetoken", response.data.FantasyTimetoken, { expires: 1 });
            commit("SET_TOKEN", result);
            resolve();
          } else {
            Message({
              message: response.result || response.message,
              type: "error",
              duration: 2000,
            });
            reject(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
