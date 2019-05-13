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
import { isWeiXin, delUrlQuery } from "./utils";

Vue.prototype.$day = dayjs;
VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);
Vue.use(Vant);

Vue.prototype.$api = api;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
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
  }
  if (to.query.name) {
    api.user
      .loginWithPhone({
        phone: "15884594704",
        code: "123654"
      })
      .then(({ data }) => {
        store.commit("UPDATE_USER_INFO", data.resultData);
        next();
      });
  }
  if (isWeiXin()) {
    api.user
      .getUserBaseInfo()
      .then(({ data }) => {
        store.commit("UPDATE_USER_INFO", data.resultData);
        next();
      })
      .catch(() => {
        api.wechat
          .getAuthorizeUrl({
            redirectURI: delUrlQuery("code")
          })
          .then(({ data }) => {
            window.location = data.resultData;
          })
          .catch(() => {
            next();
          });
      });
    return;
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
