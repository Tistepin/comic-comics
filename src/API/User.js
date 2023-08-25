import request from "@/utils/request";

export function GetUserInfo() {
  return request({
    url: "ComicA/works/user/getUserEntity",
    method: "GET",
  });
}
export function UpdateUser(data) {
  return request({
    url: "ComicA/works/user/updateUser",
    method: "POST",
    data,
  });
}

// 根据指定id获取user信息
export function GetIdUserEntity(params) {
  return request({
    url: "ComicA/works/user/GetIdUserEntity",
    method: "GET",
    params
  });
}