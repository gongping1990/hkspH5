import axios from "../http";
// eslint-disable-next-line no-unused-vars
import qs from "querystring";

const common = {
  // 手机登录
  sendCode(params) {
    return axios.get("/poem/common/sendCode", { params });
  }
};

export default common;
