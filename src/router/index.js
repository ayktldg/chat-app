import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/stream",
    name: "Stream",
    component: () =>
      import(/* webpackChunkName: "stream" */ "../views/Stream.vue"),
    beforeEnter: (to, from, next) => {
      const isLoggedIn = store.getters.isLoggedIn;
      if (!isLoggedIn) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "*",
    redirect: "/",
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
