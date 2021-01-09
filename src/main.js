import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./common/rem";

import Axios from "axios";

const isPro = Object.is(process.env.NODE_ENV, "production");
const baseURL = isPro ? "https://apin.eastday.com/api" : "/api";
Vue.prototype.$axios = Axios;
Axios.defaults.baseURL = baseURL;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
