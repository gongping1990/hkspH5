import axios from "../http";
import qs from "querystring";

const user = {
  // 手机登录
  loginWithPhone(params) {
    return axios.post("/sp/preuser/loginWithPhone", qs.stringify(params));
  },
  // 密码登录
  loginWithPassword(data) {
    return axios.post("/sp/preuser/loginWithPassword", qs.stringify(data));
  },
  // 修改密码
  changePassword(params) {
    return axios.post("/sp/preuser/changePassword", qs.stringify(params));
  },
  wxUserLogin(params) {
    return axios.post("/sp/preuser/wxUserLogin", qs.stringify(params));
  },
  bindPhone() {
    return axios.get("/sp/preuser/bindPhone");
  }
};

export default user;
