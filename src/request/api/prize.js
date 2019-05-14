import axios from "../http";
// eslint-disable-next-line no-unused-vars
import qs from "querystring";

const prize = {
  getConvertOrderRecord(params) {
    return axios.get("/sp/prize/getConvertOrderRecord", { params });
  },
  prizeList(params) {
    return axios.get("/sp/prize/adminList", { params });
  },
  prizeDetails(params) {
    return axios.get("/sp/prize/details", { params });
  },
  convertPrize(params) {
    return axios.post("/sp/prize/convertPrize", qs.stringify(params));
  },
  getOrderDetails(params) {
    return axios.post("/sp/prize/getOrderDetails", qs.stringify(params));
  }
};

export default prize;
