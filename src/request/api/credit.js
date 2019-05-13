import axios from "../http";
// eslint-disable-next-line no-unused-vars
import qs from "querystring";

const credit = {
  getCreditRank(params) {
    return axios.get("/sp/credit/getCreditRank", { params });
  },
  signin(params) {
    return axios.post("/sp/credit/signin", qs.stringify(params));
  }
};

export default credit;
