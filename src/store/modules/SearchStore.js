

import { GetWorks } from "../../API/index";
const state = {
    WorksData:[]
};
const mutations = {
  SET_WORKSDATA: (state, result) => { 
    state.WorksData = result; 
  },
};
const actions = {
    GetWorksData({ commit }, data) {
        // commit("SET_TOKEN", data);
        return new Promise((resolve, reject) => {
            GetWorks(data)
            .then((response) => {
              if (response.code==20000) {
                setTimeout(function () {
      
                  commit("SET_WORKSDATA", response.data.data.works);
                }, 400);
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
