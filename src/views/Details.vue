<template>
  <div class="Details">
    <div class="Details__Explain">
      <div class="Details__Explain__filter"></div>
      <div class="Details__Explain__Topbgc">
        <div class="Details__Explain__Topbgc__Img">
          <img :src="WorksInfoData.defaultImage" alt="" />
        </div>
      </div>
      <div class="Details__Explain__Container" style="text-align: initial">
        <div class="Details__Explain__Container__Title">
          {{ WorksInfoData.worksName }}
        </div>
        <div class="Details__Explain__Container__UserInfo">
          <div class="Details__Explain__Container__UserInfo__author">
            作者：<span>{{ WorksInfoData.worksCreator }}</span>
          </div>
          <div class="Details__Explain__Container__UserInfo__author">
            题材：<span>{{ WorksInfoData.worksCategory }}</span>
          </div>
          <div class="Details__Explain__Container__UserInfo__author">
            地区：<span>{{ WorksInfoData.worksArea }}</span>
          </div>
        </div>
        <div class="Details__Explain__Container__Describe">
          {{ WorksInfoData.worksDescribe }}
        </div>
      </div>
    </div>
    <div class="Details__Chapter">
      <div class="Details__Chapter__Operate">
        <div>
          {{
            WorksInfoData.worksStatus == 1
              ? "連載中"
              : WorksInfoData.worksStatus == 2
              ? "完結"
              : ""
          }}
        </div>
        <div @click="Changeorder">{{ order == 0 ? "正序" : "倒序" }}</div>
      </div>
      <div class="Details__Chapter__List">
        <div class="Details__Chapter__List__spanBox">
          <span
            v-for="item in WorksChapterData"
            :key="item.cartoonChapterId"
            @click="
              checkOutImg(
                item.cartoonPages,
                item.id,
                item.cartoonChapterId,
                item.worksId,
                item
              )
            "
            >{{ item.cartoonChapterId }}</span
          >
        </div>

        <div
          class="Details__Chapter__List__Develop"
          @click="ExpandClick"
          v-show="IsShowExpand"
        >
          展开剩余章节
        </div>
      </div>
      <el-row>
        <el-col :span="8">
          <div class="Details__Chapter__StartRead-left" @click="Subscribe">
            <div>
              <svg
                v-if="YesOrNoFavorite == false"
                t="1688629451016"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3353"
              >
                <path
                  d="M461.1 887.1S210.6 784 98.3 552.5C46.6 446 46.3 303.3 147 202.1c100.6-101.1 263.8-101.2 364.4 0C612 101 775.2 101 875.8 202.1 976.5 303.3 979.1 458 924.5 552.5 789 787.1 570.3 885.1 570.3 885.1c-29.8 16.3-78.9 16.8-109.2 2z m20.1-41.4c17.3 8.5 50.7 7.9 66.8-1l3.6-1.7c2.7-1.2 8.5-4 17-8.5 14.6-7.8 31-17.3 48.8-28.6 51-32.6 102.1-73.1 149.7-121.9 45.2-46.3 85-97.7 117.8-154.5 50-86.6 36.9-216.2-41.5-294.9-82.7-83.1-216.6-83.1-299.2 0l-32.6 32.8-32.6-32.8c-82.7-83.1-216.6-83.1-299.3 0-78 78.4-89.5 195.7-40 297.8 33.6 69.1 82.8 130.8 143.9 185 43 38.2 89.2 70.4 135.4 96.7 16.2 9.2 31 16.9 44.3 23.3 7.8 3.7 13 6.1 15.5 7.1l2.4 1.2z"
                  fill="#ffffff"
                  p-id="3354"
                ></path>
              </svg>
              <svg
                v-if="YesOrNoFavorite == true"
                t="1688631037994"
                class="icon"
                viewBox="0 0 1025 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3688"
              >
                <path
                  d="M1024.549 360.609c0-170.492-133.815-309.265-298.055-309.265-81.129 0-157.91 34.998-213.344 94.701-55.509-59.702-132.367-94.701-213.344-94.701C135.49 51.344 1.751 190.041 1.751 360.609c0 5.719 0.534 10.827 0.991 15.021-0.076 1.373-0.152 2.745-0.152 4.194 0 30.193 7.319 63.361 21.73 98.59 0.458 1.295 0.915 2.516 1.449 3.657 90.812 217.844 440.412 468.474 455.279 479.985 9.227 7.092 20.205 10.6 31.263 10.6 11.209 0 22.266-3.659 31.566-10.903 12.733-9.911 310.941-224.551 429.279-427.603 4.498-6.861 7.854-13.494 10.828-19.215 0.914-1.829 1.753-3.658 2.744-5.413l0.382-0.839c0.382-0.686 0.839-1.449 1.296-2.059 7.091-13.802 12.732-26.611 17.232-39.116 12.274-32.177 18.3-60.847 18.3-87.61 0-2.058-0.077-3.888-0.229-5.414C1024.093 370.979 1024.549 366.251 1024.549 360.609z"
                  fill="#f4ea2a"
                  p-id="3689"
                ></path>
              </svg>
            </div>
            收藏
          </div>
        </el-col>
        <el-col :span="16">
          <div
            class="Details__Chapter__StartRead-right"
            @click="LookWorks(WorksWatchHistoryVo == null ? true : false)"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
              >
                <path
                  fill="#ffffff"
                  d="M512 256c-168 0-329.6 106.4-384 256 54.4 149.6 216 256 384 256 167.2 0 330.4-106.4 384.8-256C841.6 362.4 679.2 256 512 256z m0 416c-88 0-160-72-160-160s72-160 160-160 160 72 160 160-72 160-160 160z m96-160c0 52.8-43.2 96-96 96s-96-43.2-96-96 43.2-96 96-96 96 43.2 96 96z"
                />
              </svg>
            </div>
            <span>{{
              WorksWatchHistoryVo == null ? "立即观看" : '继续观看第'+WorksWatchHistoryVo.worksHistoryViewingChapter+'章'
            }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  GetWorksInfo,
  GetWorksChapterList,
  GetYesOrNoFavorite,
  SaveBookToShelf,
  Unsubscribe,
  GetRecordInfo,
} from "../API/Details";
import { Login } from "../API/login";
import { SaveWorksPopularity } from "../API/Popularity";
export default {
  name: "Details",
  data() {
    return {
      WorksInfoData: {},
      WorksChapterData: [], //章節
      WorksChapterCacheData: [], //章節緩存剩餘的數據
      IsShowExpand: true, //隱藏章節顯示
      order: 0,
      WorksType: null,
      YesOrNoFavorite: false,
      WorksWatchHistoryVo: {
        worksId: "",
      },
    };
  },
  created() {
    let worksId = this.$route.params.worksId;
    // sessionStorage.setItem("DetailsWorksId",ID)
    this.getWorksInfo(
      worksId ? worksId : sessionStorage.getItem("DetailsWorksId")
    );
    this.getWorksChapterList(
      worksId ? worksId : sessionStorage.getItem("DetailsWorksId")
    );
    this.getYesOrNoFavorite(
      worksId ? worksId : sessionStorage.getItem("DetailsWorksId")
    );
    this.getRecordInfo(
      worksId ? worksId : sessionStorage.getItem("DetailsWorksId")
    );
  },
  mounted() {},
  methods: {
    Changeorder() {
      if (this.order == 1) {
        this.order = 0;
      } else {
        this.order = 1;
      }

      let worksId = this.$route.params.worksId;
      this.getWorksChapterList(
        worksId ? worksId : sessionStorage.getItem("DetailsWorksId")
      );
    },
    // 获取详情信息
    getWorksInfo(ID) {
      GetWorksInfo({ WorksId: ID }).then((res) => {
        this.WorksInfoData = res.data.data;
      });
    },
    //章节目录
    getWorksChapterList(ID) {
      GetWorksChapterList({ worksId: ID, order: this.order }).then((res) => {
        this.WorksChapterData = res.data.data.slice(0, 21);
        // if (res.data.data.length >21) {

        // }
        this.WorksChapterCacheData = res.data.data;
        // this.WorksChapterCacheData = res.data.data;
      });
    },
    // 展開
    ExpandClick() {
      this.WorksChapterData = this.WorksChapterCacheData;
      this.IsShowExpand = false;
    },
    // 點擊觀看
    checkOutImg(cartoonPages, id, WorksChapterId, WorksId) {
      sessionStorage.setItem("id", id);
      sessionStorage.setItem("pageCount", cartoonPages);
      sessionStorage.setItem("WorksChapterId", WorksChapterId);
      sessionStorage.setItem("WorksId", WorksId);
      sessionStorage.setItem("Works", JSON.stringify(this.WorksInfoData));
      // sessionStorage.setItem("WorksType", WorksType);
      // 添加人气
      SaveWorksPopularity({
        WorksType: this.WorksInfoData.worksType,
        WorksId: WorksId,
      }).then((result) => {
        if (result.code == 20000) {
        }
      });
      this.$router.push({
        name: "WatchImg",
        params: { pageCount: cartoonPages, WorksChapterId, WorksId, id },
      });
    },
    getYesOrNoFavorite(id) {
      GetYesOrNoFavorite({ worksId: id }).then((result) => {
        if (result.code == 20000) {
          this.YesOrNoFavorite = true;
        } else {
          this.YesOrNoFavorite = false;
        }
      });
    },
    // 订阅书籍
    Subscribe() {
      let worksId = this.$route.params.worksId
        ? this.$route.params.worksId
        : sessionStorage.getItem("DetailsWorksId");
      if (this.YesOrNoFavorite) {
        Unsubscribe({ worksId })
          .then((result) => {
            if (result.code == 20000) {
              this.getYesOrNoFavorite(worksId);
            }
          })
          .catch((err) => {
            this.$message.error("取消订阅失败,请反馈");
          });
      } else {
        SaveBookToShelf({ worksId })
          .then((result) => {
            if (result.code == 20000) {
              this.getYesOrNoFavorite(worksId);
            }
          })
          .catch((err) => {
            this.$message.error("订阅失败,请反馈");
          });
      }
    },
    // 查看是否该用户以前看过该作业 把历史记录信息查出来
    getRecordInfo(worksId) {
      GetRecordInfo({ WorksId: worksId }).then(({ data }) => {
        this.WorksWatchHistoryVo = data.data;
      });
    },
    LookWorks(bool) {
      if (this.WorksChapterData.length <= 0) {
        this.$message.error("没有章节");
      }
      if (bool) {
        let worksOne = this.WorksChapterData[0];
        this.checkOutImg(
          worksOne.cartoonPages,
          worksOne.id,
          worksOne.cartoonChapterId,
          worksOne.worksId
        );
      } else {
        sessionStorage.setItem(
          "id",
          this.WorksWatchHistoryVo.worksHistoryViewingChapterId
        );
        sessionStorage.setItem(
          "pageCount",
          this.WorksWatchHistoryVo.cartoonPages
        );
        sessionStorage.setItem(
          "WorksChapterId",
          this.WorksWatchHistoryVo.worksHistoryViewingChapter
        );
        sessionStorage.setItem("WorksId", this.WorksWatchHistoryVo.worksId);
        sessionStorage.setItem("Works", JSON.stringify(this.WorksInfoData));
        sessionStorage.setItem(
          "worksHistoryViewingChapterImage",
          this.WorksWatchHistoryVo.worksHistoryViewingChapterImage
        );
        // sessionStorage.setItem("WorksType", WorksType);
        let id = this.WorksWatchHistoryVo.worksHistoryViewingChapterId;
        let cartoonPages = this.WorksWatchHistoryVo.cartoonPages;
        let WorksChapterId =
          this.WorksWatchHistoryVo.worksHistoryViewingChapter;
        let WorksId = this.WorksWatchHistoryVo.worksId;
        this.$router.push({
          name: "WatchImg",
          params: { pageCount: cartoonPages, WorksChapterId, WorksId, id },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.Details {
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;

  &__Explain {
    height: 40%;
    position: relative;
    z-index: 2;
    overflow: hidden;
    margin-bottom: 10px;
    // 背景
    &__filter {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: -5;
      background-image: url("http://10.161.139.216/api/oss/getWorkContent?ImageDefaultStatus=1&WorksId=1");
      background-repeat: no-repeat;
      background-size: cover;
      filter: blur(8px); // 虚化的程度
    }
    &__Topbgc {
      height: 50%;

      position: relative;
      &__Img {
        background-color: #fff;
        position: absolute;
        left: calc(50% - 45px);
        bottom: -2px;
        height: 80%;
        width: 90px;
        padding: 3px;
        z-index: -1;
        img {
          width: 100%;
        }
      }
    }
    // 内容
    &__Container {
      z-index: 20;
      height: 50%;
      padding: 10px;
      background-color: #fff;
      color: #a1a1a1;
      font-size: 12px;
      // ?标题
      &__Title {
        margin: 8px 0;
        color: #333;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      &__UserInfo {
        margin: 8px 0;
        // font-size: 14px;
        span {
          color: #333;
        }
      }
      // 描述
      &__Describe {
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
    }
  }

  &__Chapter {
    height: calc(60% - 10px);
    background-color: #fff;

    &__Operate {
      width: 100%;
      font-size: 12px;
      height: 26px;
      color: #a1a1a1;
      div {
        padding: 5px;
        display: inline-block;
      }
      div:first-child {
        color: #333;
      }
      div:nth-child(2) {
        float: right;
        padding-right: 20px;
        // margin-right: 20px;
      }
    }

    &__List {
      position: relative;
      width: 100%;
      padding: 10px;

      height: 82%;
      overflow: hidden;
      &__spanBox {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 100%;
        // height: 100%;
        max-height: 100%;
        overflow: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar-track-piece {
          background: #d3dce6;
        }

        &::-webkit-scrollbar {
          width: 0px;
        }

        &::-webkit-scrollbar-thumb {
          background: #99a9bf;
          border-radius: 20px;
        }
        span {
          display: inline-block;
          padding: 6px 50px;
          margin: 5px 0;
          margin-right: 10px;
          max-height: 28px;
          background-color: rgb(241, 241, 241);
          &:nth-of-type(3n + 0) {
            margin-right: 0;
          }
        }
      }

      &__Develop {
        position: absolute;
        left: 0;
        bottom: 4px;
        width: 100%;
        height: 28px;
        color: #333;
        background-color: rgb(241, 241, 241);
        font-size: 12px;
        text-align: center;
        line-height: 28px;
        padding: 3px 0;
      }
    }
    &__StartRead-left {
      font-size: 16px;
      text-align: center;
      line-height: 50px;
      background-color: #e95858;
      margin-right: 3px;
      div {
        position: absolute;
        top: calc(50% - 20px);
        left: 20px;
        height: 100%;
        width: 20px;
        display: inline-block;
      }
    }
    &__StartRead-right {
      font-size: 16px;
      text-align: center;
      line-height: 50px;
      background-color: #e95858;
      div {
        position: absolute;
        top: calc(50% - 15px);
        left: 160px;
        height: 100%;
        width: 30px;
        display: inline-block;
      }
    }
  }
}
</style>
