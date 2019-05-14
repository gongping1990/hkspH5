import axios from "../http";
// eslint-disable-next-line no-unused-vars
import qs from "querystring";

const useroperate = {
  // 手机登录
  listByBroadcast() {
    return axios.get("/sp/useroperate/listByBroadcast");
  },
  listByHotKeyword() {
    return axios.get("/sp/useroperate/listByHotKeyword");
  },
  getRecommendBySubject(params) {
    return axios.get("/sp/useroperate/getRecommendBySubject", { params });
  },
  remindToShare() {
    return axios.get("/sp/useroperate/remindToShare");
  },
  getCreditByUser(params) {
    return axios.post("/sp/useroperate/getCreditByUser", qs.stringify(params));
  }
};

export default useroperate;
