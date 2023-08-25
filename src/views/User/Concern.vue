<template>
  <div class="Concern">
    <div class="Concern-main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="关注的人" name="first">
          <div class="userhead" v-for="item in Conncern_UserInfoList" :key="item.UserID">
            <el-row>
              <el-col :span="4">
                <div class="userhead-image" @click="ToUserDetails(item)">
                  <el-avatar :size="50" :src="circleUrl"></el-avatar>
                </div>
                <svg
                  t="1692842618332"
                  class="zaixian_icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="8075"
                  width="15"
                  height="15"
                >
                  <path
                    d="M512 1011.2a497.6 497.6 0 1 1 194.304-39.2192A496.0768 496.0768 0 0 1 512 1011.2z"
                    :fill="item.state==1?'#18FF00':'#2c2c2c'"
                    p-id="8076"
                  ></path>
                  <path
                    d="M512 25.6a484.8 484.8 0 1 1-189.3248 38.208A483.328 483.328 0 0 1 512 25.6m0-25.6C229.2352 0 0 229.2352 0 512s229.2352 512 512 512 512-229.2352 512-512S794.7648 0 512 0z"
                    fill="#39B54A"
                    p-id="8077"
                  ></path></svg
              ></el-col>
              <el-col :span="14">
                <div class="userhead-info" @click="ToUserDetails(item)">
                  <span>{{item.targetInfo.nickname}}</span>
                  <br />
                  <span>{{item.targetInfo.sign}}</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="userhead-an">
                  <el-button
                    round
                    style="background-color: #cccccc"
                    size="small"
                    >已关注</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </div>
          
        </el-tab-pane>
        <el-tab-pane label="粉丝" name="second"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { GetContactState } from "../../API/contact";
export default {
  name: "Concern",
  data() {
    return {
      activeName: "first",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      Conncern_UserInfoList: [],
    };
  },
  created() {
    // console.log(this.$webSocket);
    this.GetContactState();
  },
  methods: {
    ToUserDetails(data) {
      sessionStorage.setItem("Concern.targetId",data.targetInfo.id)
      sessionStorage.setItem("Concern.UserId",data.UserID)
      sessionStorage.setItem("Concern.state",data.state)
      this.$router.push({ path: "/User/ConcernMain", query: { userdata: data } });
    },
    GetContactState() {
      GetContactState()
        .then((result) => {
          this.Conncern_UserInfoList = result.data.ContactStates;
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
// 移动端样式
@media screen and (max-width: 768px) {
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
  .userhead {
    .zaixian_icon {
      position: relative;
      top: -15px;
      right: -15px;
    }
    .userhead-info {
      position: relative;
      left: 15px;
      text-align: left;
      top: 5px;
    }
    .userhead-an {
      position: absolute;
      right: 0px;
      top: 5px;
    }
  }
}
</style>