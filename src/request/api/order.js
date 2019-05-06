import axios from "../http";
// eslint-disable-next-line no-unused-vars
import qs from "querystring";

const order = {
  // 下单
  newOrder(params) {
    return axios.post("/poem/order/newOrder", qs.stringify(params));
  },
  getOrderDetails(params) {
    return axios.get("/poem/order/getOrderDetails", { params });
  }
};

export default order;
