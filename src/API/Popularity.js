import request from "@/utils/request";
// 今日添加作品人气 
export function SaveWorksPopularity(params) {
  return request({
    url: "ComicA/works/popularity/saveWorksPopularity",
    method: "POST",
    params,
  });
}