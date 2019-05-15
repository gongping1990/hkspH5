import Vue from "vue";
import Vuex from "vuex";

let userInfo = window.localStorage.getItem("userInfo");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: userInfo ? JSON.parse(userInfo) : {},
    gradeData: {},
    showShare: false,
    shareInfo: {},
    shareType: 0
  },
  mutations: {
    UPDATE_USER_INFO(state, payload) {
      state.userInfo = { ...state.userInfo, ...payload };
      window.localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    UPDATE_GRADE_DATA(state, payload) {
      state.gradeData = payload;
    },
    UPDATE_SHARE_INFO(state, payload) {
      state.shareInfo = payload;
    },
    CHANGE_SHOW_SHARE(state) {
      state.showShare = !state.showShare;
    },
    CHANGE_SHARE_TYPE(state, payload) {
      state.shareType = payload;
    }
  },
  actions: {}
});
