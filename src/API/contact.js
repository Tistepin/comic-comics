import request from "@/utils/request";
// 獲取好友 和好友状态
export function GetContactState() {
  return request({
    url: "ComicA/works/contact/GetContactState",
    method: "post",
  });
}


// 獲取好友 和好友状态
export function GetCheckContact() {
  return request({
    url: "ComicA/works/contact/GetCheckContact",
    method: "post",
  });
}



// 獲取好友 和好友状态
export function AddFriend(params) {
  return request({
    url: "ComiGo/AddFriend",
    method: "PUT",
    params
  });
}


// 獲取好友 和好友状态
export function getWorks(params) {
  return request({
    url: "ComiGo/getWorks",
    method: "GET",
    params
  });
}