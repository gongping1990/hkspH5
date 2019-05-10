import Vue from "vue";
import Vuex from "vuex";

let userInfo = window.localStorage.getItem("userInfo");
console.log(userInfo);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: userInfo ? JSON.parse(userInfo) : {},
    gradeData: {},
    showShare: false
  },
  mutations: {
    UPDATE_USER_INFO(state, payload) {
      state.userInfo = { ...state.userInfo, ...payload };
      window.localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      console.log(state.userInfo, payload);
    },
    UPDATE_GRADE_DATA(state, payload) {
      state.gradeData = payload;
    },
    CHANGE_SHOW_SHARE(state) {
      state.showShare = !state.showShare;
    }
  },
  actions: {}
});
