import axios from "../http";
import qs from "querystring";

const feedback = {
  // 手机登录
  listByCurrentUser(params) {
    return axios.get("/sp/feedback/listByCurrentUser", { params });
  },
  addContent(params) {
    return axios.post("/sp/feedback/addContent", qs.stringify(params));
  },
  viewFeedback(params) {
    return axios.get("/sp/feedback/viewFeedback", { params });
  }
};

export default feedback;
