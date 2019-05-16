import axios from "../http";
// eslint-disable-next-line no-unused-vars
import qs from "querystring";

const common = {
  // 手机登录
  sendCode(params) {
    return axios.get("/sp/common/sendCode", { params });
  },
  userRegister(params) {
    return axios.post("/sp/app/wss/userRegister", qs.stringify(params));
  },
  listWordByBook(params) {
    return axios.post("/sp/app/listWordByBook", qs.stringify(params));
  },
  listOnlineBook() {
    return axios.get("/sp/book/listOnlineBook");
  }
};

export default common;
