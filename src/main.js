import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/index.scss";
import "./utils/flexible"; //自适应

Vue.config.productionTip = false;
import Cookies from "js-cookie";
Vue.prototype.$cookie = Cookies;
import webSocket from "./utils/global";

Vue.prototype.$webSocket = webSocket;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
router.beforeEach((to, from, next) => {
  //需要权限
  if (to.meta.requireAuth) {
    //判断当前是否拥有权限
    var token = Cookies.get("FantasyTimetoken");
    if (token) {
      next();
    } else {
      // 无权，跳转登录
      next({
        path: "/Login",
        query: { redirect: from.fullPath },
      });
    }
  } else {
    // 不需要权限，直接访问
    next();
  }
});
