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
        meta: {
          requireAuth: true,
        },
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
        meta: {
          requireAuth: true,
        },
      },
      // 用户关主人数页面
      {
        path: "/User/Concern",
        name: "/Concern",
        component: () => import("@/views/User/Concern"),
        meta: {
          requireAuth: true,
        },
      },
      // 用户关注人的详细页面
      {
        path: "/User/ConcernMain",
        name: "/Concern",
        component: () => import("@/views/User/ConcernMain"),
        meta: {
          requireAuth: true,
        },
      },
      // 插图集合
      {
        path: "/Illustration",
        name: "Illustration",
        component: () => import("@/views/Illustration"),
      },
      // 作品详情信息
      {
        path: "/Details",
        name: "Details",
        component: () => import("@/views/Details"),
        meta: {
          requireAuth: true,
        },
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
  // 登录页面
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register"),
  },
  // 播放器
  {
    path: "/WatchImg",
    name: "WatchImg",
    component: () => import("@/views/WatchImg"),
  },
  // 播放器
  {
    path: "/ChatRoom",
    name: "ChatRoom",
    component: () => import("@/views/User/ChatRoom"),
    meta: {
      requireAuth: true,
    },
  },
    // ces
    {
      path: "/test",
      name: "test",
      component: () => import("@/views/test"),
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
