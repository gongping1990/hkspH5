import Vue from "vue";
import Vuex from "vuex";
import api from "./request/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    gradeData: {},
    showShare: false,
    shareInfo: {},
    shareType: 0,
    isShowTabBarTips: false
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
    },
    CHANGE_TAB_BAR_TIPS(state, payload) {
      state.isShowTabBarTips = payload;
    }
  },
  actions: {
    getCreditMsg() {
      let threeTime = 3 * 60 * 1000;
      let FiveTime = 5 * 60 * 1000;
      let TenTime = 10 * 60 * 1000;
      let nowTime = "";
      let isReceiveThree = false;
      let isReceiveFive = false;
      let isReceiveTen = false;

      api.welfare.getCreditMsg().then(({ data }) => {
        nowTime = data.resultData.learnTime;

        if (nowTime >= threeTime && !data.resultData.getCreditLearnThree) {
          isReceiveThree = true;
        }

        if (nowTime >= FiveTime && !data.resultData.getCreditLearnFive) {
          isReceiveFive = true;
        }

        if (nowTime >= TenTime && !data.resultData.getCreditLearnTen) {
          isReceiveTen = true;
        }

        console.log(isReceiveThree, isReceiveFive, isReceiveTen);

        if (isReceiveThree || isReceiveFive || isReceiveTen) {
          this.commit("CHANGE_TAB_BAR_TIPS", true);
        } else {
          this.commit("CHANGE_TAB_BAR_TIPS", false);
        }
      });
    }
  }
});
