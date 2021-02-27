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
  const isAuthenticated = window.localStorage.getItem("user") || "";

  if ((to.name == "Login" || to.name == "Register") && isAuthenticated) {
    next({ path: "/dashboard" });
  } else if (to.name == "Dashboard" && !isAuthenticated) {
    next({ path: "/" });
  } else if (to.name === "Logout") {
    window.localStorage.removeItem("user");
    next({ path: "/" });
  }
  next();
});

export default router;
