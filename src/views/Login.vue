<template>
  <div class="screen">
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
      <div class="register">注册</div>
    </el-header>
    <div class="screen__content">
      <!-- 标题 -->
      <div class="title">
        <span>登录</span>
      </div>
      <form class="login" @submit="() => false">
        <div class="login_field">
          <input
            type="text"
            class="login_input"
            required="required"
            v-model="listQuery.username"
          />
          <span>账户</span>
        </div>
        <div class="login_field">
          <input
            type="password"
            class="login_input"
            required="required"
            v-model="listQuery.password"
          />
          <span class="button_text">密码</span>
        </div>
        <button class="button login_submit" @click="LoginFun">登录</button>
        <a href="#">去注册</a>
      </form>
    </div>
  </div>
</template>

<script>
import { Login } from "../API/login";

export default {
  name: "Login",
  data() {
    return {
      listQuery: {
        username: "18574933063", //18574933063
        password: "",
      },
    };
  },
  methods: {
    LoginFun() {
      if (this.listQuery.username === "" || this.listQuery.password === "")
        return;
      this.$store.dispatch("userStore/Login", this.listQuery).then((res) => {
        this.LoginWebSocket();
        this.$router.push("/Home");
      });
      // .catch((err) => {});
      // Login(this.listQuery).then((res) => {
      //   this.$store.dispatch("userStore/Login", {
      //     key: "token",
      //     value: res.data.FantasyTimetoken,
      //   });
      // this.listQuery = {
      //   username: "",
      //   password: "",
      // };
      //   this.$router.push("/Home");
      // });
    },
    // 登录聊天系统
    LoginWebSocket() {
      // 消息处理 读取
      this.$webSocket.onmessage = function (evt) {
        if (evt.data.indexOf("}") > -1) {
          console.log("recv json <==" + evt.data);
          this.msgItem.push(JSON.parse(evt.data));
          console.log(this.msgItem);
        } else {
          console.log("recv<==" + evt.data);
        }
      }.bind(this);
      //出错回调
     this.$webSocket.onerror = function (evt) {
        console.log(evt.data);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  font-family: AlimamaShuHeiTi-Bold;
}

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

img {
  width: 100%;
}
.el-header {
  background-color: #fff;
  color: #333;
  height: 60px;
  padding: 0;
  border-bottom: 1px solid #e9eef3;
  width: 100vw;
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
  .register {
    height: 100%;
    line-height: 60px;
    text-align: center;
    float: right;
    margin-right: 10px;
  }
}

.title {
  width: 100%;
  display: flex;
}

.title span {
  font-size: 30px;
  font-weight: bold;
  font-family: AlimamaShuHeiTi-Bold;
  padding: 20px;
  margin-top: 50px;
  //   width: 100%;
  display: flex;
  justify-content: center;
}

.screen {
  position: relative;
  height: 100%;
  width: 100%; //360px;
}

.screen__content {
  z-index: 1;
  position: relative;
  height: calc(100% - 60px);
}

.login {
  width: 100%;
  padding: 30px;
  //   padding-top: 40%;
}
.login a {
  display: none;
}
.login_field {
  padding: 20px 0px;
  position: relative;
}

.login_input {
  border: none;
  border-bottom: 2px solid #d1d1d4;
  background: none;
  padding: 10px 0px;
  font-weight: 700;
  width: 100%;
  transition: 0.2s;
  outline: none;
}

.login_field span {
  color: rgb(159, 159, 159);
  position: absolute;
  left: 0;
  padding: 9px 0px;
  text-transform: uppercase;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: 0.5s;
  pointer-events: none;
  font-size: 1em;
}

.login_input:valid ~ span,
.login_input:focus ~ span {
  color: #f57c7c;
  transform: translateY(-25px);
  font-size: 1.08em;
  font-weight: bold;
}

.login_input:valid,
.login_input:focus {
  border-bottom: 2px solid #f57c7c;
}

.login_submit {
  background: #e95858;
  font-size: 18px;
  margin-top: 30px;
  padding: 5px 20px;
  border-radius: 26px;
  border: none;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color: #fff;
  cursor: pointer;
  transition: 0.2s;
  height: 40px;
  line-height: 40px;
  justify-content: center;
  animation: animate 2s linear infinite;
  -webkit-user-select: none;
}

.social-login {
  position: absolute;
  height: 140px;
  width: 160px;
  text-align: center;
  bottom: 0px;
  right: 0px;
  color: #fff;
}
</style>

<style lang="scss" scoped>
// PC端樣式
@media screen and (min-width: 768px) and (max-width: 1920px) {
  .login_register {
    background: transparent;

    &:hover {
      background: #fff !important;
    }
  }

  .el-header {
    display: none;
  }
  .screen {
    display: flex;
    justify-content: center;
  }
  .screen__content {
    width: 400px;
    // height: 600px;
    margin-top: 100px;
  }
  .login {
    a {
      display: inline;
      font-size: 14px;
      color: rgb(58, 58, 226);
      float: right;
      margin-top: 10px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .login_field span {
    font-size: 16px;
  }
  .login_input:valid ~ span,
  .login_input:focus ~ span {
    font-size: 18px;
  }
}
</style>
