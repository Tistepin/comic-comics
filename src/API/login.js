
import request from "@/utils/request";
// 登錄
export function Login(data) {
  return request({
    url: "ComicA/FT/acl/login",
    method: "POST",
    data,
  });
}
// 登出
export function LoginOut(data) {
  return request({
    url: "ComicA/FT/index/logout",
    method: "POST",
    data,
  });
}

// 修改密码
export function UpdateUserPwd(data) {
  return request({
    url: "ComicA/works/user/updateUserPwd",
    method: "POST",
    data,
  });
}
