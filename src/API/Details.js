import request from "@/utils/request";
// 作品詳情信息
export function GetWorksInfo(params) {
  return request({
    url: "ComicA/works/works/getWorksInfo",
    method: "GET",
    params,
  });
}
// 章节目录
export function GetWorksChapterList(params) {
  return request({
    url: "ComicA/works/cartoonworksdetails/getWorksChapterList",
    method: "GET",
    params,
  });
}

// 章节目录
export function GetWorksWatchHistory(data) {
  return request({
    url: "ComicA/works/workswatchhistory/getWorksWatchHistory",
    method: "POST",
    data,
  });
}
// 书架
export function GetWorksBookshelf(params) {
  return request({
    url: "ComicA/works/worksbookshelf/getWorksBookshelf",
    method: "GET",
    params,
  });
}

// 该用户上传的作品的总数
export function GetWorksCount() {
  return request({
    url: "ComicA/works/works/GetWorksCount",
    method: "GET",
  });
}

// 该用户书架的总数
export function GetCollectCount() {
  return request({
    url: "ComicA/works/works/GetCollectCount",
    method: "GET",
  });
}

// 上传作品
export function uploadWork(data) {
  return request({
    url: "ComicA/works/works/uploadWork",
    method: "PUT",
    data,
  });
}


// 查询作品集
export function GetWorksList(params) {
  return request({
    url: "ComicA/works/works/list",
    method: "GET",
    params,
  });
}


// 查询该用户上传的作品下拉
export function GetWorksDownList(params) {
  return request({
    url: "ComicA/works/works/getWorksDownList",
    method: "GET",
    params,
  });
}


// 上传章节信息
export function SaveUploadWorskData(data) {
  return request({
    url: "ComicA/works/cartoonworksdetails/saveUploadWorskData",
    method: "PUT",
    data,
  });
}

// 排行榜
export function GetDailyLeaderboard(params) {
  return request({
    url: "ComicA/works/works/getDailyLeaderboard",
    method: "GET",
    params,
  });
}


// 获取插图集合
export function GetIllustration(params) {
  return request({
    url: "ComicA/works/works/getIllustration",
    method: "GET",
    params,
  });
}


// 是否收藏了该书籍
export function GetYesOrNoFavorite(params) {
  return request({
    url: "ComicA/works/worksbookshelf/getYesOrNoFavorite",
    method: "GET",
    params,
  });
}

//  收藏作品
export function SaveBookToShelf(data) {
  return request({
    url: "ComicA/works/worksbookshelf/saveBookToShelf",
    method: "PUT",
    data,
  });
}
//  取消收藏作品
export function Unsubscribe(data) {
  return request({
    url: "ComicA/works/worksbookshelf/unsubscribe",
    method: "DELETE",
    data,
  });
}


//  添加观看历史记录
export function Record(data) {
  return request({
    url: "ComicA/works/workswatchhistory/record",
    method: "POST",
    data,
  });
}

//  获取改用户在这个作品的历史记录来定位
export function GetRecordInfo(params) {
  return request({
    url: "ComicA/works/workswatchhistory/getRecordInfo",
    method: "GET",
    params,
  });
}


// 获取指定章节信息
export function GetChapterInfo(params) {
  return request({
    url: "ComicA/works/cartoonworksdetails/getChapterInfo",
    method: "GET",
    params,
  });
}

// 获取指定用户的作品和插图
export function GetIDTpWorks(params) {
  return request({
    url: "ComicA/works/works/GetIDTpWorks",
    method: "GET",
    params,
  });
}