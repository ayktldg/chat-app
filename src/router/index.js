import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
//import store from "../store";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../components/Register.vue"),
  },
  {
    path: "/stream",
    name: "Stream",
    component: () =>
      import(/* webpackChunkName: "stream" */ "../views/Stream.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/chat-room/:id",
        name: "ChatRoom",
        component: () =>
          import(
            /* webpackChunkName: "chat-room" */ "../components/ChatRoom.vue"
          ),
      },
    ],
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser)
    next({ path: "/", query: { redirect: to.fullPath } });
  else next();
});

export default router;
