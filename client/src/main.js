// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import Loading from "components/lib/loading";
import CenterContainer from "components/lib/center-container";
import axios from 'axios';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.component("loading", Loading);
Vue.component("center-container", CenterContainer);

import VueBus from 'vue-bus';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.use(VueBus);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  vuetify,
  components: { App }
});
