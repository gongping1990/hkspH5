import axios from "../http";
// eslint-disable-next-line no-unused-vars
import qs from "querystring";

const category = {
  columnList(params) {
    return axios.get("/sp/category/columnList", { params });
  }
};

export default category;
