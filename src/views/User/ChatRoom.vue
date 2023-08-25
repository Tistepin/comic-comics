<template>
  <div class="ChatRoom">
    <div class="ChatRoom-head">
      <div class="ico_sug" @click="back">
        <svg
          t="1692930700603"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="11005"
          width="25"
          height="25"
        >
          <path
            d="M534.528 926.208c-14.336 0-28.672-5.632-39.936-16.384l-350.208-350.208c-22.016-22.016-22.016-57.856 0-79.872l347.648-347.648c22.016-22.016 57.856-22.016 79.872 0 22.016 22.016 22.016 57.856 0 79.872l-308.224 308.224 310.272 310.272c22.016 22.016 22.016 57.856 0 79.872-10.752 10.752-25.088 15.872-39.424 15.872z"
            fill="#666666"
            p-id="11006"
          ></path>
          <path
            d="M835.072 926.208c-14.336 0-28.672-5.632-39.936-16.384l-350.208-350.208c-22.016-22.016-22.016-57.856 0-79.872l347.648-347.648c22.016-22.016 57.856-22.016 79.872 0 22.016 22.016 22.016 57.856 0 79.872l-308.224 308.224 310.272 310.272c22.016 22.016 22.016 57.856 0 79.872-10.752 10.752-25.088 15.872-39.424 15.872z"
            fill="#666666"
            p-id="11007"
          ></path>
        </svg>
      </div>
      <div class="User_name">{{ UserInfo.nickname }}</div>
    </div>

    <div class="ChatRoom-main">
      <div>
        <ul>
          <li class="chat">
            <div class="right">
              <el-avatar size="large" :src="circleUrl"></el-avatar>
            </div>
            <div>消息</div>
          </li>
        </ul>
      </div>
    </div>
    <footer class="footer">
      <div class="ChatRoom-wei">
        <div class="msg">
          <el-input v-model="msgcontext.msgTxt"></el-input>
        </div>
        <div class="send" @click="sendmsg">
          <svg
            t="1692941216330"
            class="icon"
            viewBox="0 0 1171 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="12017"
            width="30"
            height="30"
            fill="#11b1f0"
          >
            <path
              d="M502.238 1024l142.189-194.32-142.19-40.964V1024zM0 566.714l403.968 122.374L901.485 266.66 515.916 721.68l431.91 133.42L1170.285 0 0 566.714z"
              fill=""
              p-id="12018"
            ></path>
          </svg>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { GetIdUserEntity } from "../../API/User";
export default {
  name: "ChatRoom",
  data() {
    return {
      UserInfo: {},
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      msgItem: [],
      msgcontext: {
        TargetId: -1,
        Type: -1,
        CreateTime: new Date().getTime(),
        userId: -1,
        msgTxt: "",
      },
    };
  },
  created() {
    this.msgcontext.TargetId =
      this.$route.query.targetId == undefined
        ? sessionStorage.getItem("Concern.targetId")
        : this.$route.query.targetId;
    this.msgcontext.userId =
      this.$route.query.UserId == undefined
        ? sessionStorage.getItem("Concern.UserId")
        : this.$route.query.UserId;
    console.log(this.msgcontext);
    this.GetUserInfo();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    GetUserInfo() {
      GetIdUserEntity({ UserId: this.msgcontext.userId })
        .then((result) => {
          this.UserInfo = result.data.data;
          console.log(this.UserInfo);
        })
        .catch((err) => {});
    },
    WebSocketOperate() {
      //消息处理 读取
      this.$webSocket.onmessage = function (evt) {
        console.log("onmessage", evt.data);
        if (evt.data.indexOf("}") > -1) {
          console.log("recv json <==" + evt.data);
          // this.onmessage(JSON.parse(evt.data));
        } else {
          console.log("recv<==" + evt.data);
        }
      }.bind(this);
      //关闭回调
      this.$webSocket.onclose = function (evt) {
        console.log("您已自动下线"); //code 1006
      };
      //出错回调
      this.$webSocket.onerror = function (evt) {
        console.log(evt.data);
      };
    },
    sendmsg() {
      // console.log(1);
      this.msgcontext.Type = 1;
      console.log(this.$webSocket);
      this.$webSocket.send(JSON.stringify(this.msgcontext));
    },
    // createmsgcontext: function () {
    //   return JSON.parse(JSON.stringify(this.msgcontext));
    // },
  },
};
</script>

<style lang="scss" scoped>
// 移动端样式
@media screen and (max-width: 768px) {
  .ChatRoom {
    position: relative;
    .ChatRoom-head {
      background: #333;
      display: flex;
      align-items: center;
      border: 1px solid #000;
      .User_name {
        margin: auto;
        color: #ffffff;
      }
    }
    .ChatRoom-main {
      min-height: calc(100vh - 73px);
      border: 1px solid #000;
      ul {
        padding: 0 10px 0 10px;
      }
      ul li {
        /* 背景与边框 */
        // background-color: #ffffff;
        // border: 1px solid #b9b9b9;
        /* 去除黑点 */
        list-style: none;
        /* 消白边 */
        padding-inline-start: 0px;
      }
      li.chat {
        // justify-content: flex-start;
        align-items: center;
        display: flex;
      }
      .chat.mine {
        flex-direction: row-reverse;
      }
      .chat.outh {
        flex-direction: row;
      }

      .right {
        margin-left: 15px;
      }
      .left {
        margin-right: 15px;
      }
    }
    .ChatRoom-wei {
      display: flex;
      align-items: center;
      position: relative;
      .msg {
        width: 100%;
        border: 1px solid #333;
      }
      .send {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>