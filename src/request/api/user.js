import axios from "../http";
import qs from "querystring";

const user = {
  // 手机登录
  loginWithPhone(params) {
    return axios.post("/poem/user/loginWithPhone", qs.stringify(params));
  },
  // 密码登录
  loginWithPassword(data) {
    return axios.post("/poem/user/loginWithPassword", qs.stringify(data));
  },
  // 修改密码
  changePassword(params) {
    return axios.post("/poem/user/changePassword", qs.stringify(params));
  },
  wxUserLogin(params) {
    return axios.post("/poem/user/wxUserLogin", qs.stringify(params));
  },
  loginOut() {
    return axios.get("/poem/user/loginOut");
  }
};

export default user;
