import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/Home",
    children: [
      {
        path: "/Home",
        name: "Home",
        component: () => import("@/views/Home"),
      },
      // 漫画大全
      {
        path: "/Cartoon",
        name: "Cartoon",
        component: () => import("@/views/Cartoon"),
      },
      // 排行榜
      {
        path: "/Ranking",
        name: "Ranking",
        component: () => import("@/views/Ranking"),
      },
      {
        path: "/Renew",
        name: "Renew",
        component: () => import("@/views/Renew"),
      },
      // 书架和历史记录
      {
        path: "/HistoryAndBookshelfView",
        name: "HistoryAndBookshelfView",
        component: () => import("@/views/HistoryAndBookshelfView"),
        meta: {
          requireAuth: true,
        },
      },
      // 用户信息
      {
        path: "/User/UserDetails",
        name: "/UserDetails",
        component: () => import("@/views/User/UserDetails"),
      },
      // 插图集合
      {
        path: "/Illustration",
        name: "Illustration",
        component: () => import("@/views/Illustration"),
        meta: {
          requireAuth: true,
        },
      },
      // 作品详情信息
      {
        path: "/Details",
        name: "Details",
        component: () => import("@/views/Details"),
      },
    ],
  },
  // 手机版登录
  {
    path: "/Personals",
    name: "Personals",
    component: () => import("@/views/Personals"),
  },
  // 登录页面
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/views/Login"),
  },

  // 播放器
  {
    path: "/WatchImg",
    name: "WatchImg",
    component: () => import("@/views/WatchImg"),
  },
];

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  // mode: 'hash',
  // base: process.env.BASE_URL,
  routes,
});

export default router;
