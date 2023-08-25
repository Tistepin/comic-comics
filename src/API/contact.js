import request from "@/utils/request";
// 獲取好友 和好友状态
export function GetContactState() {
  return request({
    url: "ComicA/works/contact/GetContactState",
    method: "post",
  });
}
