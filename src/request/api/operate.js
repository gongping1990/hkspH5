import axios from "../http";
// eslint-disable-next-line no-unused-vars
import qs from "querystring";

const operate = {
  // 手机登录
  updateWxRemind() {
    return axios.post("/poem/operate/updateWxRemind");
  },
  getUserCards() {
    return axios.get("/poem/operate/getUserCards");
  },
  learnDay(params) {
    return axios.post("/poem/operate/addLearn", qs.stringify(params));
  },
  listLearnHistory(params) {
    return axios.get("/poem/operate/listLearnHistory", { params });
  },
  addCard(params) {
    return axios.post("/poem/operate/addCard", qs.stringify(params));
  },
  shareByLessonDetails(params) {
    return axios.get("/poem/operate/shareByLessonDetails", { params });
  },
  like(params) {
    return axios.get("/poem/operate/like", { params });
  }
};

export default operate;
