import axios from "../http";
// eslint-disable-next-line no-unused-vars
import qs from "querystring";

const useroperate = {
  // 手机登录
  listByBroadcast() {
    return axios.get("/sp/useroperate/listByBroadcast");
  }
};

export default useroperate;
