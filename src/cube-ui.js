import Vue from "vue";

// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Style,
  Scroll,
  Slide,
  IndexList,
  Swipe,
  Sticky,
  ScrollNav,
  ScrollNavBar
} from "cube-ui";

Vue.use(Scroll);
Vue.use(Slide);
Vue.use(IndexList);
Vue.use(Swipe);
Vue.use(Sticky);
Vue.use(ScrollNav);
Vue.use(ScrollNavBar);
