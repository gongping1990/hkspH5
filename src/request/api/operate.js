import axios from "../http";
// eslint-disable-next-line no-unused-vars
import qs from "querystring";

const operate = {
  // 手机登录
  updateWxRemind() {
    return axios.post("/sp/operate/updateWxRemind");
  },
  getUserCards() {
    return axios.get("/sp/operate/getUserCards");
  },
  learnDay(params) {
    return axios.post("/sp/operate/addLearn", qs.stringify(params));
  },
  listLearnHistory(params) {
    return axios.get("/sp/operate/listLearnHistory", { params });
  },
  addCard(params) {
    return axios.post("/sp/operate/addCard", qs.stringify(params));
  },
  shareByLessonDetails(params) {
    return axios.get("/sp/operate/shareByLessonDetails", { params });
  },
  like(params) {
    return axios.get("/sp/operate/like", { params });
  }
};

export default operate;
