import request from "@/utils/request";
// 地区下拉
export function GetAreaDownList() {
  return request({
    url: "ComicA/works/area/GetAreaDownList",
    method: "GET",
  });
}

// 题材下拉
export function GetCategoryDownList(params) {
    return request({
      url: "ComicA/works/category/getCategoryDownList",
      method: "GET",
      params
    });
  }