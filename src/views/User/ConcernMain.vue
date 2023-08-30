<template>
  <div class="ConcernMain">
    <div class="ConcernMain-head">
      <div>
        <el-avatar :size="70" :src="UserInfo.header"></el-avatar>
        <svg
          t="1692842618332"
          class="zaixian_icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8075"
          width="20"
          height="20"
        >
          <path
            d="M512 1011.2a497.6 497.6 0 1 1 194.304-39.2192A496.0768 496.0768 0 0 1 512 1011.2z"
            :fill="state == 1 ? '#18FF00' : '#2c2c2c'"
            p-id="8076"
          ></path>
          <path
            d="M512 25.6a484.8 484.8 0 1 1-189.3248 38.208A483.328 483.328 0 0 1 512 25.6m0-25.6C229.2352 0 0 229.2352 0 512s229.2352 512 512 512 512-229.2352 512-512S794.7648 0 512 0z"
            fill="#39B54A"
            p-id="8077"
          ></path>
        </svg>
      </div>
      <div class="mass">
        <el-row>
          <el-col :span="8">
            <div class="fans">
              <span
                ><b>{{UserInfo.fans>9999?UserInfo.fans+"万":UserInfo.fans}}</b><br />
                <span style="font-size: 12px">粉丝</span></span
              >
            </div></el-col
          >
          <el-col :span="8"
            ><div class="Concern">
              <span
                ><b>{{UserInfo.care}}</b><br />
                <span style="font-size: 12px">关注</span></span
              >
            </div></el-col
          >
          <el-col :span="8"
            ><div class="GetLike">
              <span
                ><b>{{UserInfo.likes}}</b><br />
                <span style="font-size: 12px">获赞</span></span
              >
            </div></el-col
          >
        </el-row>
      </div>
      <div class="ConcernMain-info">
        <el-row>
          <el-col :span="16"
            ><div>
              <div>
                <span>{{ UserInfo.nickname }}</span>
              </div>
              <div>
                <span>一些标签</span>
              </div>
            </div></el-col
          >
          <el-col :span="8">
            <router-link
              :to="{
                path: '/ChatRoom',
                query: { UserId: userId,targetId:targetId },
              }"
            >
              <div class="sixing">
                <svg
                  t="1692782308587"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2383"
                  width="32"
                  height="32"
                >
                  <path
                    d="M938.666667 454.101333c0 201.621333-186.432 364.202667-416.938667 368.661334-9.130667 10.346667-11.733333 13.226667-16.213333 17.898666-1.493333 1.578667-1.493333 1.578667-3.029334 3.136-7.552 7.68-15.253333 14.741333-35.456 32.597334-54.272 41.322667-130.837333 62.165333-186.602666 62.272a21.333333 21.333333 0 0 1-14.378667-5.546667 22.485333 22.485333 0 0 1-6.741333-22.592c0.810667-3.413333 2.197333-6.293333 4.053333-9.28 2.026667-3.242667 4.629333-6.570667 8.874667-11.605333 1.109333-1.322667 8.682667-10.197333 11.093333-13.077334 4.672-5.589333 8.64-10.56 12.416-15.594666 23.253333-31.146667 33.216-58.474667 26.666667-83.52a21.333333 21.333333 0 1 1 41.28-10.794667c10.602667 40.597333-3.52 79.36-33.770667 119.850667-1.173333 1.578667-2.368 3.136-3.584 4.693333 39.104-7.509333 82.026667-23.744 113.6-47.722667 18.282667-16.213333 25.472-22.826667 32.128-29.610666l2.602667-2.666667c4.757333-4.992 7.36-7.893333 21.333333-23.765333a21.333333 21.333333 0 0 1 16-7.253334c212.736 0 384-146.773333 384-326.08C896 274.773333 724.736 128 512 128S128 274.773333 128 454.101333c0 86.933333 40.32 168.661333 111.274667 229.461334a21.333333 21.333333 0 1 1-27.776 32.405333C131.413333 647.296 85.333333 553.941333 85.333333 454.101333 85.333333 249.642667 277.034667 85.333333 512 85.333333s426.666667 164.309333 426.666667 368.768zM341.333333 384c0-11.776 9.493333-21.333333 21.333334-21.333333h298.666666c11.776 0 21.333333 9.472 21.333334 21.333333 0 11.776-9.493333 21.333333-21.333334 21.333333H362.666667c-11.776 0-21.333333-9.472-21.333334-21.333333z m0 128c0-11.776 9.728-21.333333 21.376-21.333333h213.248a21.312 21.312 0 1 1 0 42.666666h-213.248A21.312 21.312 0 0 1 341.333333 512z"
                    fill="#3D3D3D"
                    p-id="2384"
                  ></path>
                </svg>
              </div>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <div class="ConcernMain-signature">
        <div>
          <span v-if="UserInfo.sign == ''"> 这个人很懒,什么都没写 </span>
          <span v-else>
            {{ UserInfo.sign }}
          </span>
        </div>
      </div>
    </div>
    <div class="ConcernMain-main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="插图" name="first">
          <div class="Illustration">
            <el-image
              class="Illustration-list-image"
              v-for="item in worksList.chatu"
              :src="item.defaultImage"
              :key="item.worksId"
              @load="urlInfo"
              @click="GotoDetails(item)"
            ></el-image>
          </div>
        </el-tab-pane>
        <el-tab-pane label="漫画" name="second">
          <div class="haoyou_works">
            <div
              class="haoyou_DescribeBox"
              v-for="item in worksList.works"
              :key="item.worksId"
            >
              <div class="haoyou_DescribeBox_Img" @click="GotoDetails(item)">
                <img :src="item.defaultImage" alt="" />
              </div>
              <div class="haoyou_DescribeBox_Title">
                {{ item.worksName }}
                <div class="haoyou_itle_Describe">
                  {{ item.worksDescribe }}
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { GetIDTpWorks } from "../../API/Details";
import { GetIdUserEntity } from "../../API/User";
export default {
  name: "ConcernMain",
  data() {
    return {
      activeName: "first",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      userId: 0,
      worksList: {},
      UserInfo: {},
      state: 0,
      targetId: 0,
    };
  },
  created() {
    this.targetId =
      this.$route.query.userdata.targetId == undefined
        ? sessionStorage.getItem("Concern.targetId")
        : this.$route.query.userdata.targetId;
    this.userId =
      this.$route.query.userdata.UserId == undefined
        ? sessionStorage.getItem("Concern.UserId")
        : this.$route.query.userdata.UserId;
    this.state =
      this.$route.query.userdata.state == undefined
        ? sessionStorage.getItem("Concern.state")
        : this.$route.query.userdata.state;
    this.GetIDTpWorks();
    this.GetIdUserEntity();
  },
  mounted() {
    // this.userId =
    //   this.$route.query.userdata.targetId == undefined
    //     ? sessionStorage.getItem("Concern.targetId")
    //     : this.$route.query.userdata.targetId;
    // this.state =
    //   this.$route.query.userdata.state == undefined
    //     ? sessionStorage.getItem("Concern.state")
    //     : this.$route.query.userdata.state;
  },
  methods: {
    GetIDTpWorks() {
      GetIDTpWorks({ UserId: this.targetId })
        .then((result) => {
          this.worksList = result.data.map;
        })
        .catch((err) => {});
    },
    urlInfo(e) {},
    // 去詳情
    GotoDetails(item) {
      sessionStorage.setItem("DetailsWorksId", item.worksId);
      this.$router.push({
        name: "Details",
        params: { worksId: item.worksId, worksType: item.worksType },
      });
    },
    GetIdUserEntity() {
      GetIdUserEntity({ UserId: this.targetId })
        .then((result) => {
          this.UserInfo = result.data.data;
        })
        .catch((err) => {});
    },
  },
};
</script>

<style  lang="scss" scoped>
// 手机样式
@media screen and (max-width: 768px) {
  .ConcernMain-head {
    margin: 15px 0 0 22px;
    display: flex;
    flex-wrap: wrap;
    .mass {
      width: 70%;
      margin: 15px 0 0 20px;
      font-size: 20px;
    }
    .ConcernMain-info {
      text-align: left;
      width: 100%;
      margin-top: 10px;
    }
    .ConcernMain-signature {
      margin-top: 10px;
    }
    .zaixian_icon {
      position: relative;
      left: -22px;
    }
  }
  ::v-deep .el-tabs__content {
    margin: 20px;
  }
  ::v-deep .el-tabs__nav {
    margin-left: 20px;
  }
  ::v-deep .el-button--primary {
    position: absolute;
    left: 20px;
  }
  .Illustration {
    column-count: 2;
    .el-image {
      text-align: center;
      margin: 10px 0px 0 0;
    }
  }
  .haoyou_works {
    // column-count: 2;
    display: flex;

    flex-wrap: wrap;
    .haoyou_DescribeBox {
      width: 150px;
      margin: 0 0 0 15px;
      .haoyou_DescribeBox_Img {
        text-align: center;
        margin: 10px 0px 0 0;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .sixing {
    position: relative;
    right: 0;
    text-align: center;
  }
  .ConcernMain-info {
  }
}
</style>