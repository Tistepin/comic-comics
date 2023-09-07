import request from "@/utils/request";
// 作品詳情信息
export function Remove(data) {
  return request({
    url: "ComicA/oss/remove",
    method: "DELETE",
    data,
  });
}