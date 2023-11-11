import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import HomeLogin from "@/components/HomeLogin.vue";
import HomeRegister from "@/components/HomeRegister.vue";

import QnAList from "@/components/qna/QnAList.vue";
import QnaDetail from "@/components/qna/QnaDetail.vue";
import QnAWrite from "@/components/qna/QnAWrite.vue";

import NoticeList from "@/components/notice/NoticeList.vue";
import NoticeDetail from "@/components/notice/NoticeDetail.vue";
import NoticeWrite from "@/components/notice/NoticeWrite.vue";

import UserInform from "@/components/UserInform.vue";
import HomeFind from "@/components/HomeFind.vue";
import UserFix from "@/components/UserFix.vue";
import UserSearch from "@/components/UserSearch.vue";
import LineShow from "@/components/LineShow.vue";

import store from "@/store";

Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["userStore/checkUserInfo"];
  const checkToken = store.getters["userStore/checkToken"];
  let token = sessionStorage.getItem("access-token");

  if (checkUserInfo != null && token) {
    await store.dispatch("userStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    router.push({ name: "login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: HomeLogin,
  },
  {
    path: "/signup",
    name: "signup",
    component: HomeRegister,
  },
  {
    path: "/qna",
    name: "qna",
    component: () => import("@/views/AppQnA"),
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "qnalist",
        component: QnAList,
      },
      {
        path: "detail/:num",
        name: "qnadetail",
        component: QnaDetail,
      },
      {
        path: ":type",
        name: "qnawrite",
        beforeEnter: onlyAuthUser,
        component: QnAWrite,
      },
      {
        path: ":type/:num",
        name: "qnamodify",
        beforeEnter: onlyAuthUser,
        component: QnAWrite,
      },
    ],
  },
  {
    path: "/notice",
    name: "notice",
    component: () => import("@/views/NoticeView"),
    redirect: "/notice/list",
    children: [
      {
        path: "list",
        name: "noticelist",
        component: NoticeList,
      },
      {
        path: "detail/:num",
        name: "noticedetail",
        component: NoticeDetail,
      },
      {
        path: ":type",
        name: "noticewrite",
        beforeEnter: onlyAuthUser,
        component: NoticeWrite,
      },
      {
        path: ":type/:num",
        name: "noticemodify",
        beforeEnter: onlyAuthUser,
        component: NoticeWrite,
      },
    ],
  },
  {
    path: "/userfix",
    name: "userFix",
    beforeEnter: onlyAuthUser,
    component: UserFix,
  },
  {
    path: "/userinform",
    name: "userinform",
    beforeEnter: onlyAuthUser,
    component: UserInform,
  },
  {
    path: "/userfind",
    name: "move_find",
    component: HomeFind,
  },
  {
    path: "/usersearch",
    name: "usersearch",
    component: UserSearch,
  },
  {
    path: "/line",
    name: "linesearch",
    component: LineShow,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
