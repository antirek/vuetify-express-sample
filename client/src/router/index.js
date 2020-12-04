import Vue from "vue";
import Router from "vue-router";
import Home from "components/home";
import Account from "components/account";
import Login from "components/login";
import ItemsList from "components/items";
import ItemsRoutes from "components/items/_routes"
import PlumsList from "components/plums";
import PlumView from "components/plums/view";

import store from "../store";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

export default new Router({

  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/account",
      name: "Account",
      component: Account,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/items",
      name: "Items",
      component: ItemsList,
      beforeEnter: ifAuthenticated,
      children: ItemsRoutes,
    },
    {
      path: "/plums",
      name: "plums",
      component: PlumsList,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/plums/:id",
      component: PlumView,
      name: "plumView",
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
  ]
});
