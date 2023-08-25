<template>
  <div class="Personal">
    <el-container>
      <el-header>
        <div class="back" @click="$router.back()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
          >
            <path
              fill="#d81e06"
              d="M671.968176 911.99957c-12.287381 0-24.576482-4.67206-33.951566-14.047144L286.048434 545.984249c-18.751888-18.719204-18.751888-49.12028 0-67.872168L638.016611 126.111222c18.751888-18.751888 49.12028-18.751888 67.872168 0 18.751888 18.719204 18.751888 49.12028 0 67.872168l-318.016611 318.047574L705.888778 830.047574c18.751888 18.751888 18.751888 49.12028 0 67.872168C696.544658 907.32751 684.255557 911.99957 671.968176 911.99957z"
            />
          </svg>
        </div>
        <div class="title">个人中心</div>
      </el-header>
      <el-main>
        <div class="LoginSelect">
          <div v-if="UserName == ''" class="LoginSelect__container">
            <span @click="$router.push('/Login')">登录</span><span>注册</span>
          </div>
          <div v-else class="LoginSelect__User">
            <div class="LoginSelect__User__touxiang">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
              >
                <path
                  fill="#e6e6e6"
                  d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0zM213.333 832A298.667 298.667 0 0 1 512 533.333a170.667 170.667 0 1 1 170.667-170.666A170.667 170.667 0 0 1 512 533.333 298.667 298.667 0 0 1 810.667 832z"
                />
              </svg>
            </div>
            <div class="LoginSelect__User__Name">{{ UserName }}</div>
          </div>
        </div>
        <div class="LoginSelect__TitleContent">
          <div
            class="LoginSelect__TitleContent_Title"
            @click="GoHistoryAndBookshelfView('Bookshelf')"
          >
            书籍收藏
          </div>
          <div class="LoginSelect__TitleContent_More">
            <div>更多</div>
            <img src="../assets/image/more.png" class="rightImg" />
          </div>
        </div>
        <div class="LoginSelect__TitleContent">
          <div
            class="LoginSelect__TitleContent_Title"
            @click="GoHistoryAndBookshelfView('History')"
          >
            阅读历史
          </div>
          <div class="LoginSelect__TitleContent_More">
            <div>更多</div>
            <img src="../assets/image/more.png" class="rightImg" />
          </div>
        </div>
        <div class="LoginSelect__TitleContent">
          <div class="LoginSelect__TitleContent_Title">
            <router-link to="/User/Concern">关注</router-link>
          </div>
          <div class="LoginSelect__TitleContent_More">
            <div>更多</div>
            <img src="../assets/image/more.png" class="rightImg" />
          </div>
        </div>
        <div class="LoginSelect__TitleContent">
          <div class="LoginSelect__TitleContent_Title">
            <router-link to="/User/UserDetails">个人信息</router-link>
          </div>
          <div class="LoginSelect__TitleContent_More">
            <div>更多</div>
            <img src="../assets/image/more.png" class="rightImg" />
          </div>
        </div>
        <div class="LoginSelect__TitleContent">
          <div
            class="LoginSelect__TitleContent_Title"
            @click="dialogVisible = true"
          >
            修改密碼
          </div>
          <div class="LoginSelect__TitleContent_More">
            <div>更多</div>
            <img src="../assets/image/more.png" class="rightImg" />
          </div>
        </div>
        <div class="LoginSelect__TitleContent">
          <div class="LoginSelect__TitleContent_Title" @click="loginOut()">
            退出登錄
          </div>
          <div class="LoginSelect__TitleContent_More">
            <div>更多</div>
            <img src="../assets/image/more.png" class="rightImg" />
          </div>
        </div>
      </el-main>
    </el-container>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
      <el-input v-model="updateUserPwd.pwd1" placeholder="旧密码"></el-input>
      <el-input v-model="updateUserPwd.pwd2" placeholder="新密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="danger" @click="UpdateUserPwd()">确 定</el-button>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { LoginOut, UpdateUserPwd } from "../API/login";
export default {
  name: "Personals",
  data() {
    return {
      UserName: "",
      dialogVisible: false,
      updateUserPwd: {
        phone: this.UserName,
        pwd1: "",
        pwd2: "",
      },
    };
  },
  created() {
    this.initData();
  },
  methods: {
    // 初始化函数
    initData() {
      var FantasyTimetoken = this.$cookie.get("FantasyTimetoken");
      if (FantasyTimetoken) {
        this.UserName = sessionStorage.getItem("UserName");
      }
    },
    // 退出登录
    loginOut() {
      LoginOut().then((res) => {
        this.$cookie.remove("FantasyTimetoken");
        sessionStorage.removeItem("UserName");
        this.$router.push("/Home");
      });
    },
    // 修改密码
    UpdateUserPwd() {
      UpdateUserPwd(this.updateUserPwd)
        .then((result) => {
          this.dialogVisible = false;
          this.$message.success("修改成功");
        })
        .catch((err) => {});
    },
    GoHistoryAndBookshelfView(a) {
      this.$router.push({
        path: "/HistoryAndBookshelfView",
        query: { key: a },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #fff;
  color: #333;
  height: 60px;
  padding: 0;
  border-bottom: 1px solid #e9eef3;
}
.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  padding: 10px;
  height: calc(100vh - 60px);
}

.Personal {
  .back {
    height: 100%;
    width: 20px;
    line-height: 70px;
    float: left;
    svg {
      height: 22px;
      font-weight: bold;
    }
  }
  .title {
    height: 100%;
    width: 100%;
    line-height: 60px;
    text-align: center;
  }

  .LoginSelect {
    padding: 10px;
    height: 130px;

    &__container {
      height: 100%;
      border-radius: 10px;
      background: linear-gradient(90deg, rgb(250, 43, 43), rgb(241, 183, 183));
      padding: 0 30px;
      display: flex;
      align-items: center;
      justify-items: center;
      span {
        flex: 1;
        box-sizing: border-box;
        display: block;
        padding: 6px 40px;
        background-color: #fff;
        color: #f57c7c;
        font-size: 14px;
        font-weight: bold;
        margin: 0 10px;
      }
    }

    &__User {
      height: 100%;
      width: 100%;
      border-radius: 10px;
      background: linear-gradient(90deg, rgb(250, 43, 43), rgb(241, 183, 183));
      padding: 26px 30px 10px;
      &__touxiang {
        width: 46px;
        margin: 0 auto;
        font-size: 16px;
      }
      &__Name {
        width: 100%;
        font-size: 16px;
        text-align: center;
      }
    }
    &__TitleContent {
      // background-color: red;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 5px 0;
      border-bottom: 1px solid #e9eef3;
      &_Title {
        font-size: 14px;
        font-weight: bold;
      }
      &_More {
        display: flex;
        align-items: center;
        cursor: pointer;
        div {
          font-size: 12px;
          color: #a1a1a1;
        }
        img {
          height: 14px;
          margin: 0 10px 0 5px;
        }
      }
    }
  }
}
.LoginSelect__TitleContent {
}
</style>
