import axios from "../http";

const wechat = {
  // 手机登录
  getAuthorizeUrl(params) {
    return axios.get("/sp/wechat/oauth2/getAuthorizeUrl", { params });
  },
  share(params) {
    return axios.get("/sp/wechat/oauth2/share", { params });
  }
};

export default wechat;
