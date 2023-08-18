import request from "@/utils/request";
// 作品詳情信息
export function Remove(params) {
  return request({
    url: "ComicA/oss/remove",
    method: "DELETE",
    params,
  });
}