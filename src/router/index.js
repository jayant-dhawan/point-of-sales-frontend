import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue")
  },
  {
    path: "/logout",
    name: "Logout"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = window.localStorage.getItem("user");

  if (
    (to.name == "Login" || to.name == "Register") &&
    isAuthenticated != null
  ) {
    next({ path: "/dashboard" });
  } else if (to.name == "Dashboard" && isAuthenticated == null) {
    next({ path: "/" });
  } else if (to.name === "Logout") {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("vuex");
    next({ path: "/" });
  }
  next();
});

export default router;
