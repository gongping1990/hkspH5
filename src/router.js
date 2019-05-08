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
        },
        {
          path: "study",
          name: "study",
          component: () => import("./views/study")
        }
      ]
    },
    {
      path: "/search",
      name: "search",
      component: () => import("./views/Search")
    },
    {
      path: "/collection",
      name: "collection",
      component: () => import("./views/Collection")
    },
    {
      path: "/feedbook",
      name: "feedbook",
      component: () => import("./views/Feedbook")
    },
    {
      path: "/feedbook-content",
      name: "feedbookContent",
      component: () => import("./views/FeedbookContent")
    },

    {
      path: "/feedbook-detail",
      name: "feedbookDetail",
      component: () => import("./views/FeedbookDetail")
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
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Composition.vue")
    }
  ]
});
