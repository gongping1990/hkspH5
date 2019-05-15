import axios from "../http";
import qs from "querystring";

const user = {
  // 手机登录
  loginWithPhone(params) {
    return axios.post("/sp/user/loginWithPhone", qs.stringify(params));
  },
  // 密码登录
  loginWithPassword(data) {
    return axios.post("/sp/user/loginWithPassword", qs.stringify(data));
  },
  // 修改密码
  changePassword(params) {
    return axios.post("/sp/user/changePassword", qs.stringify(params));
  },
  wxUserLogin(params) {
    return axios.post("/sp/user/wxUserLogin", qs.stringify(params));
  },
  bindPhone(params) {
    return axios.post("/sp/user/bindPhone", qs.stringify(params));
  },
  getUserBaseInfo() {
    return axios.get("/sp/user/getUserBaseInfo");
  }
};

export default user;
