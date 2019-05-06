import axios from "../http";
// eslint-disable-next-line no-unused-vars
import qs from "querystring";

const course = {
  // 学员录音列表
  getStuReadAloneList(params) {
    return axios.get("/poem/course/getStuReadAloneList", { params });
  },
  // 今日详情
  getLearningToday(params) {
    return axios.get("/poem/course/getLearningToday", { params });
  },
  // 今日主页
  getLearningHome(params) {
    return axios.get("/poem/course/getLearningHome", { params });
  },
  // 获取播报
  getBroadcastList(params) {
    return axios.get("/poem/course/getBroadcastList", { params });
  },
  getQtCourseByDefult() {
    return axios.get("/poem/course/getQtCourseByDefult");
  },
  getLessonLimit(params) {
    return axios.get("/poem/course/getLessonLimit", { params });
  },
  getQtListenCourseById(id) {
    return axios.get("/poem/course/getQtListenCourseById/" + id);
  },
  saveReadalone(params) {
    return axios.post("/poem/course/saveReadalone", qs.stringify(params));
  },
  getOrderDetails(params) {
    return axios.get("/poem/course/getOrderDetails", { params });
  }
};

export default course;
