import axios from "../http";

const banner = {
  // 手机登录
  bannerList(params) {
    return axios.get("/sp/banner/page", { params });
  }
};

export default banner;
