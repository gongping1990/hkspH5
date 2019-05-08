import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("./views/Index"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("./views/Home")
        }
      ]
    },
    {
      path: "/search",
      name: "search",
      component: () => import("./views/Search")
    },
    {
      path: "/select",
      name: "select",
      component: () => import("./views/selectClass")
    },
    {
      path: "/composition",
      name: "composition",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded whe n the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Composition.vue")
    },
    {
      path: "/welfareCentre",
      name: "welfareCentre",
      component: () => import("./views/welfareCentre")
    },
    {
      path: "/exchangeRecords",
      name: "exchangeRecords",
      component: () => import("./views/exchangeRecords")
    },
    {
      path: "/exchangeSuccess",
      name: "exchangeSuccess",
      component: () => import("./views/exchangeSuccess")
    }
  ]
});
