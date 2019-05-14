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
        },
        {
          path: "/welfareCentre",
          name: "welfareCentre",
          component: () => import("./views/welfareCentre")
        }
      ]
    },
    {
      path: "/search",
      name: "search",
      component: () => import("./views/Search")
    },
    {
      path: "/collectionSearch",
      name: "collectionSearch",
      component: () => import("./views/CollectionSearch")
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
      // which is lazy-loaded whe n the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Composition.vue")
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
    },
    {
      path: "/prizeInfo",
      name: "prizeInfo",
      component: () => import("./views/prizeInfo")
    },
    {
      path: "/fractionRank",
      name: "fractionRank",
      component: () => import("./views/fractionRank")
    }
  ]
});
