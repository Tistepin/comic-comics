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
        <span>注册</span>
      </div>
      <form class="register" @submit="() => false">
        <div class="register_field">
          <input
            type="text"
            class="register_input"
            required="required"
            v-model="listQuery.phone"
          />
          <span>手机号</span>
        </div>
        <div class="register_field">
          <input
            type="password"
            class="register_input"
            required="required"
            v-model="listQuery.password"
          />
          <span class="button_text">密码</span>
        </div>
        <div class="register_field">
          <input
            type="password"
            class="register_input"
            required="required"
            v-model="listQuery.password2"
          />
          <span class="button_text">确认密码</span>
        </div>
        <button class="button register_submit" @click="registerFun">
          注册
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { SaveUserInfo } from "../API/User";
export default {
  name: "register",
  data() {
    return {
      listQuery: {
        password: "", // 密码
        password2: "", // 确认密码
        nickname: "", //  昵称
        phone: "", // 手机号
      },
    };
  },
  methods: {
    registerFun() {
      let registerDTO = this.listQuery;
      console.log(registerDTO);
      if (registerDTO.password == registerDTO.password2) {
        SaveUserInfo(registerDTO)
          .then((result) => {
            if (result.code == 20000) {
              this.$router.push("/Login");
            }
          })
          .catch((err) => {
            this.$message.error();
            ("注册失败");
          });
      }
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

.register {
  width: 100%;
  padding: 30px;
  //   padding-top: 40%;
}
.register a {
  display: none;
}
.register_field {
  padding: 20px 0px;
  position: relative;
}

.register_input {
  border: none;
  border-bottom: 2px solid #d1d1d4;
  background: none;
  padding: 10px 0px;
  font-weight: 700;
  width: 100%;
  transition: 0.2s;
  outline: none;
}

.register_field span {
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

.register_input:valid ~ span,
.register_input:focus ~ span {
  color: #f57c7c;
  transform: translateY(-25px);
  font-size: 1.08em;
  font-weight: bold;
}

.register_input:valid,
.register_input:focus {
  border-bottom: 2px solid #f57c7c;
}

.register_submit {
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

.social-register {
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
  .register_register {
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
  .register {
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
  .register_field span {
    font-size: 16px;
  }
  .register_input:valid ~ span,
  .register_input:focus ~ span {
    font-size: 18px;
  }
}
</style>
