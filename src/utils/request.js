import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import Cookies from "js-cookie";
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: '', // process.env.VUE_APP_BASE_API,
  // withCredentials: true, // 当跨域请求时发送cookie
  timeout: 60000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // debugger
    // do something before request is sent

    var token = Cookies.get("FantasyTimetoken");
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["FantasyTimetoken"] = token; //getToken();
      config.headers["Content-Type"] = "application/json";
      // //"Content-Type" = "application/json"
    }
    return config;
  },
  (error) => {
    // do something with request error
    //console.log('request.js service.interceptors.request.use :' + error) // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  (response) => {
    // 常見的返回格式 {"status":true,"message":"消息","result":null}
    // 如下載文件就不是這個格式
    if (response.config && response.config.responseType === "blob") {
      // 判断是不是下载请求
      const data = response.data;
      const blobUrl = window.URL.createObjectURL(data);
      const aLabel = document.createElement("a");
      aLabel.download = decodeURI(
        response.headers["content-disposition"]
          .split(";")[1]
          .split("filename=")[1]
      ); // '文件名'
      aLabel.href = blobUrl;
      aLabel.click();
    } else {
      if (response.data) {
        let res = response.data;
        res = typeof res === "object" ? res : JSON.parse(res);
        return res;
      }
    }
    return "";
  },
  (error) => {
    let message = "";
    if (error.response) {
      if (error.response.data.MessageDetail) {
        message = error.response.data.MessageDetail;
      } else if (error.response.data) {
        if (error.response.data.message) {
          message = error.response.data.message;
        } else if (
          error.response.data.indexOf("Proxy error: Could not proxy request") >
          -1
        ) {
          message = "代理错误:无法代理请求，或服務器異常。請聯繫管理員。";
        } else {
          message = error.response.data;
        }
      }
    }
    if (!message) {
      message = error.message;
    }
    Message({
      dangerouslyUseHTMLString: true,
      message: message,
      type: "error",
      duration: 2 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
