import axios from "../http";
// eslint-disable-next-line no-unused-vars
import qs from "querystring";

const course = {
  // 学员录音列表
  getStuReadAloneList(params) {
    return axios.get("/sp/course/getStuReadAloneList", { params });
  },
  // 今日详情
  getLearningToday(params) {
    return axios.get("/sp/course/getLearningToday", { params });
  },
  // 今日主页
  getLearningHome(params) {
    return axios.get("/sp/course/getLearningHome", { params });
  },
  // 获取播报
  getBroadcastList(params) {
    return axios.get("/sp/course/getBroadcastList", { params });
  },
  getQtCourseByDefult() {
    return axios.get("/sp/course/getQtCourseByDefult");
  },
  getLessonLimit(params) {
    return axios.get("/sp/course/getLessonLimit", { params });
  },
  getQtListenCourseById(id) {
    return axios.get("/sp/course/getQtListenCourseById/" + id);
  },
  saveReadalone(params) {
    return axios.post("/sp/course/saveReadalone", qs.stringify(params));
  },
  getOrderDetails(params) {
    return axios.get("/sp/course/getOrderDetails", { params });
  }
};

export default course;
