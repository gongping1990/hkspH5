import axios from "../http";
import qs from "querystring";

const article = {
  // 获取年级，学期，教材
  getUserCategory(params) {
    return axios.get("/sp/article/getUserCategory/" + params.subject);
  },
  //获取学习列表
  getArticleList(params) {
    return axios.get("/sp/article/getArticleList/" + params.subject, {
      params
    });
  },
  // 获取教材版本
  getTeachEdition(params) {
    return axios.get("/sp/article/getTeachEdition/" + params.subject, {
      params
    });
  },
  // 文章点击
  articleClick(params) {
    return axios.post("/sp/article/articleClick", qs.stringify(params));
  },
  articleList(params) {
    return axios.get("/sp/article/articleList/" + params.subject, { params });
  },
  getRecommendContent(params) {
    return axios.get("/sp/article/getRecommendContent/" + params.subject);
  },
  myCollectList(params) {
    return axios.get("/sp/article/myCollectList/" + params.subject, { params });
  },
  getReadDate(params) {
    return axios.get("/sp/article/getReadDate/" + params.subject);
  },
  getReadRecordArticles(params) {
    return axios.get("/sp/article/getReadRecordArticles/" + params.subject, {
      params
    });
  },
  getShareInfo(params) {
    return axios.get("/sp/article/getShareInfo", { params });
  }
};

export default article;
