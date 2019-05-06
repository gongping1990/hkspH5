import axios from "../http";
import qs from "querystring";

const wechat = {
  // 手机登录
  getAuthorizeUrl(params) {
    return axios.post(
      "/poem/wechat/oauth2/getAuthorizeUrl",
      qs.stringify(params)
    );
  },
  share(params) {
    return axios.get("/poem/wechat/oauth2/share", { params });
  }
};

export default wechat;
