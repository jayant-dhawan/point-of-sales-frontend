import Vue from "vue";
import SuiVue from "semantic-ui-vue";
import "semantic-ui-css/semantic.min.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(SuiVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
