import axios from "../http";
// eslint-disable-next-line no-unused-vars
import qs from "querystring";

const welfare = {
  welfareInfo(params) {
    return axios.get("/sp/welfare/center/", { params });
  },
  getCreditMsg(params) {
    return axios.get("/sp/welfare/center/getCreditMsg", { params });
  }
};

export default welfare;
