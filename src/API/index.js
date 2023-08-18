import request from "@/utils/request";
// 獲取热门连载
export function GetPopularSerial(params) {
  return request({
    url: "ComicA/works/works/getPopularSerial",
    method: "GET",
    params,
  });
}
// 今日推荐 前十本
export function GetRecommendedToday(params) {
  return request({
    url: "ComicA/works/works/getRecommendedToday",
    method: "GET",
    params,
  });
}
// 最新作品 前十本
export function GetLatestCreation(params) {
  return request({
    url: "ComicA/works/works/getLatestCreation",
    method: "GET",
    params,
  });
}
//
// 经典完结 前十本
export function GetClassicEnd(params) {
  return request({
    url: "ComicA/works/works/getClassicEnd",
    method: "GET",
    params,
  });
}
// 根据作品类型获取分类
export function GetCategory() {
  return request({
    url: "ComicA/works/category/getCategory",
    method: "GET",
    params: { worksType: 1 },
  });
}
// 国家地区
export function GetArea() {
    return request({
      url: "ComicA/works/area/getArea",
      method: "GET",
      params: { worksType: 1 },
    });
}
  // 根据条件从es中获取数据
export function GetWorks(params) {
    return request({
      url: "ComicA/search/getWorks",
      method: "GET",
      params,
    });
}

// 获取这个作品的这一章的内容信息类别画画作品
export function GetWorkContent(params) {
  return request({
    url: "ComicA/getWorkContent",
    method: "GET",
    params,
  });
}
