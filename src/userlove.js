import Vue from "vue";
import "./plugins/axios";
import userlove from "./userlove.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(userlove)
}).$mount("#userlove");
