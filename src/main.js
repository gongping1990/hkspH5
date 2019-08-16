import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dayjs from "dayjs";
import Vant from "vant";
import "vant/lib/index.css";
import "amfe-flexible";
import "./cube-ui.js";
import VueClipboard from "vue-clipboard2";
import api from "./request/api";
import { baseUrl } from "./request/base.js";
import { isWeiXin, registerWx } from "./utils";
import Wechat from "./utils/wx";
import VueSocketIO from "vue-socket.io";

Vue.prototype.$day = dayjs;
VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);
Vue.use(Vant);

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: baseUrl,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    },
    options: { path: "/spwss", transports: ["websocket"] } //Optional options
  })
);

Vue.prototype.$dayjs = dayjs;
Vue.prototype.$api = api;
Vue.prototype.$wechat = Wechat;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.query["U-From-ChannelId"]) {
    store.commit("UPDATE_CHANNELID", to.query["U-From-ChannelId"]);
  }
  if (isWeiXin()) {
    registerWx({
      url: window.origin
    });
  }
  if (to.query.code) {
    api.user
      .wxUserLogin({ code: to.query.code })
      .then(({ data }) => {
        store.commit("UPDATE_USER_INFO", data.resultData);
        next();
      })
      .catch(() => {
        next();
      });
    return;
  } else if (to.query.name) {
    api.user
      .loginWithPhone({
        phone: "15884594704",
        code: "123654"
      })
      .then(({ data }) => {
        store.commit("UPDATE_USER_INFO", data.resultData);
        next();
      });
    return;
  } else {
    api.user.getUserBaseInfo().then(({ data }) => {
      store.commit("UPDATE_USER_INFO", data.resultData);
      next();
    });
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
