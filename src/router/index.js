import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/admin/index";
import Login from "../views/auth/login";
import Register from "../views/auth/register";
import Auth from "../views/auth";
import AdminProduct from "../views/admin/product/index.vue";
import AdminCategory from "../views/admin/category/index.vue";
import ForgotPassword from "../views/auth/forgetPassword";
import Checkout from "../views/user/cartList/checkout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { hideNavigation: true },
    children: [
      {
        path: "product",
        component: AdminProduct,
        name: "product",
        meta: { hideNavigation: true },
      },
      {
        path: "category",
        component: AdminCategory,
        name: "category",
        meta: { hideNavigation: true },
      },
    ],
  },
  {
    path: "/auth",
    name: "auth",
    component: Auth,
    children: [
      { path: "login", name: "Login", component: Login },
      { path: "register", name: "Register", component: Register },
      {
        path: "forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
      },
    ],
  },
  { path: "/checkout", name: "checkout", component: Checkout },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
