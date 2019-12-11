import Vue from "vue";
import Vuex from "vuex";
import api from "./request/api";
import axios from "axios";
import qs from "querystring";
let url =
  process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test"
    ? "http://huoke.test.k12.vip/"
    : "http://huoke.test.k12.vip/";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    gradeData: {},
    showShare: false,
    shareInfo: {},
    shareType: 0,
    isShowTabBarTips: false,
    channelId: "",
    investmanage: {}
  },
  mutations: {
    UPDATE_INVESTMANAGE(state, payload) {
      state.investmanage = payload;
    },
    UPDATE_CHANNELID(state, payload) {
      state.channelId = payload;
    },
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
    postIncrPVByAdvertise({ state }, payload) {
      if (!state.investmanage.id) return;
      axios.post(
        url + "fissionprep/investmanage/incrPV",
        qs.stringify({
          id: payload.id,
          uid: state.userInfo.userId,
          type: payload.type
        })
      );
    },
    postUA({ state }, type) {
      if (!state.investmanage.id) return;
      axios.post(
        url + "fissionprep/investmanage/incrPV",
        qs.stringify({
          id: state.investmanage.id,
          uid: state.userInfo.userId,
          type
        })
      );
    },
    getInvestManageById({ state, commit }) {
      axios
        .get(url + "fissionprep/investmanage/getInvestManage", {
          params: {
            uid: state.userInfo.userId,
            system: 3
          }
        })
        .then(({ data }) => {
          commit("UPDATE_INVESTMANAGE", data.resultData);
        });
    },
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

        if (isReceiveThree || isReceiveFive || isReceiveTen) {
          this.commit("CHANGE_TAB_BAR_TIPS", true);
        } else {
          this.commit("CHANGE_TAB_BAR_TIPS", false);
        }
      });
    }
  }
});
