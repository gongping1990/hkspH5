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

Vue.prototype.$day = dayjs;
VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
