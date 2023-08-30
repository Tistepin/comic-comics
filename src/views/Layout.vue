<script>
import { GetWorks } from "../API/index";
import { debounce } from "../utils/customFunc";
export default {
  name: "Layout",
  components: {},
  data() {
    return {
      UserName: "",
      // 头像
      touxiangURL:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      headerArrText: [
        { title: "首页", id: "/Home" },
        { title: "漫画大全", id: "/Cartoon" },
        { title: "排行榜", id: "/Ranking" },
        { title: "插图", id: "/Illustration" },
        { title: "书架", id: "/HistoryAndBookshelfView?key=Bookshelf" },
        { title: "历史阅读", id: "/HistoryAndBookshelfView?key=History" },
        { title: "用户个人信息", id: "/User/UserDetails" },
      ],
      isHeaderActive: "/Home",
      //搜索輸入
      HandleQuery: {
        highestRated: false, //评分最高
        latestRelease: false, //最新发布
        recentlyUpdated: false, //最近更新
        theMostPopular: false, //●	人气最旺
        worksArea: "",
        worksCategory: "",
        worksName: "",
        worksStatus: "",
        worksType: "1",
        pageNum: 1,
        pageSize: 20,
      },
      SearchInput_PC: "", //PC搜索輸入
      SearchInput_Move: "", //移动搜索輸入
      IsShowMoverInput: false, //显示移动端输入框
      msgItems: {
        count: 0,
        msgItem: [],
      },
    };
  },
  created() {
    this.isHeaderActive = this.$route.path;
    this.initData();
    this.$webSocket.webSocket.onmessage = function (evt) {
      if (evt.data.indexOf("}") > -1) {
        console.log("recv json <==" + evt.data);
        let msg = JSON.parse(evt.data);
        msg.ismine = false;
        this.msgItems.count += 1;
        console.log(this.msgItems);
      } else {
        console.log("recv<==" + evt.data);
      }
    }.bind(this);
  },
  methods: {
    // 初始化函数
    initData() {
      var FantasyTimetoken = this.$cookie.get("FantasyTimetoken");
      if (FantasyTimetoken) {
        this.UserName = sessionStorage.getItem("UserName");
      }
    },
    // 搜索
    KeyUpSearchInput_PC() {
      this.HandleQuery.worksName = this.SearchInput_PC;
      this.getWorksData();
    },
    // 移动端搜索输入
    KeyUpSearchInput_Move: debounce(function () {
      this.HandleQuery.worksName = this.SearchInput_Move;
      this.getWorksData();
    }, 1000),

    getWorksData() {
      this.$router.push("/Cartoon");
      this.$store
        .dispatch("SearchStore/GetWorksData", this.HandleQuery)
        .then((res) => {})
        .catch((err) => {});

      // GetWorks(this.HandleQuery).then((res) => {
      // });
    },

    // 导航栏切换
    checkNav(ID) {
      this.isHeaderActive = ID;
      this.$router.push(ID);
    },

    // 显示移动端输入框
    ShowMoverInput() {
      this.SearchInput_Move = "";
      this.IsShowMoverInput = !this.IsShowMoverInput;
    },
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      //   if (route.path.startsWith('/redirect/')) {
      //     return
      //   }
      if (route.path !== this.isHeaderActive) {
        this.isHeaderActive = route.path;
      }
    },
  },
};
</script>
<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <div class="header__headPortrait">
          <!-- <el-image
            style="width: 100%; height: 100%"
            :src="touxiangURL"
            :fit="'fill'"
          ></el-image> -->
          <img
            src="../assets/image/FantasyTime(已去底).jpg"
            style="width: 100%; height: 100%"
          />
        </div>
        <div class="header__headContainer">
          <nav class="header__headContainer_Nav">
            <span
              :class="isHeaderActive == item.id ? 'active' : ''"
              v-for="(item, index) in headerArrText"
              :key="item.id"
              v-show="index < 4"
              @click="checkNav(item.id)"
              >{{ item.title }}</span
            >
          </nav>
        </div>
        <div class="header__Search">
          <div class="header__Search_PC">
            <img
              src="../assets/image/search-y.png"
              @click="KeyUpSearchInput_PC"
            />
            <el-input
              v-model="SearchInput_PC"
              placeholder="请输入搜索内容"
              @keyup.native.enter="KeyUpSearchInput_PC"
            />
          </div>
          <div class="header__Search_Mover">
            <img src="../assets/image/search-y.png" @click="ShowMoverInput" />
            <div class="header__Search_Mover_Input" v-if="IsShowMoverInput">
              <el-input
                v-model="SearchInput_Move"
                placeholder="请输入搜索内容..."
                @input="KeyUpSearchInput_Move"
              />
            </div>
          </div>
        </div>
        <div class="header__User">
          <div class="header__User__Message2" v-if="(UserName == '')">
            <span @click="$router.push('/Login')">登录</span><span>|</span
            ><span @click="$router.push('/register')">注册</span>
          </div>
          <div v-else class="header__User__Message2-2">
            <img src="../assets/image/person-grey.png" />
            <span
              :class="isHeaderActive == item.id ? 'active' : ''"
              v-for="(item, index) in headerArrText"
              :key="item.id"
              v-show="index > 3 && index < 7"
              @click="checkNav(item.id)"
              >{{ item.title }}</span
            >
          </div>
          <div
            style="
              z-index: 1;
              color: red;
              left: 7px;
              position: absolute;
              top: 28px;
            "
            v-if="(UserName != '')"
          >
            {{ msgItems.count }}
          </div>
          <div
            class="header__User__Message"
            @click="$router.push('/Personals')"
          >
            <img src="../assets/image/person-grey.png" />
            <div>{{ "用户个人信息" }}</div>
          </div>
        </div>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
      <el-footer
        >版权所有 ©2013-2023
        滑稽网络科技有限公司鄂ICP备19019472号-4鄂公网安备42010402000357号
      </el-footer>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;

  height: calc(100vh - 120px);
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

<style lang="scss" scoped>
.header {
  display: flex;
  position: relative;
  // background-color: #b8d33b !important;
  background-color: #333 !important;
  color: #fff;
  padding: 0 10px !important;
  &__headPortrait {
    height: 100%;
    width: 100px;
    margin-right: 10px;
    ::v-deep .el-image {
      display: block !important;
    }
  }
  &__headContainer {
    // display: flex;
    &_Nav {
      font-size: 0;
      height: 100%;
      padding: 6px 0;
      box-sizing: border-box;

      span {
        font-size: 12px;
        font-weight: 700;
        padding: 0px 0.15rem;
        display: inline-block;
        text-align: center;
        height: 100%;
        line-height: 54px;
        margin: 0 3px;
        cursor: pointer;
        border-radius: 8px;
        // &:hover {
        //   background-color: #fee100;
        // }
        &.active {
          background-color: orange !important;
        }
      }
    }
  }
  &__Search {
    position: absolute;
    top: 0;
    left: calc(50% - 200px);
    height: 100%;
    width: 400px;
    // min-width: 180px;
    display: flex;
    align-items: center;
    img {
      height: 20px;
      position: relative;
      top: calc(50% - 10px);
      cursor: pointer;
    }

    &_PC {
      width: 100%;
      overflow: hidden;
      border-radius: 20px;
      background-color: #f5f5f5;
      height: 42px;
      line-height: 36px;
      padding: 0 0 0 10px;
      display: flex;
    }
    &_Mover {
      // width: 100%;
      padding: 2px;
      // background-color: #fff;
      border-radius: 8px;
      position: relative;

      &_Input {
        background-color: #ffa500;
        position: absolute;
        right: 0;
        bottom: -32px;
        width: 180px;
        height: 30px;
        line-height: 0;
        padding: 3px 6px;
        border-radius: 8px;
      }
      img {
        height: 28px;
        // line-height: 32px;
      }
    }

    ::v-deep .el-input {
      height: 100%;
      // background-color: red !important;
      input {
        overflow: hidden;
        border: none;
        background-color: #f5f5f5;
        height: 100%;

        width: 100%;
      }
    }
  }
  &__User {
    position: absolute;
    top: 0;
    right: 0.25rem;
    height: 100%;
    color: #fff;
    display: flex;
    // justify-content: center;
    align-items: center;
    img {
      height: 30px;
      position: relative;
      top: calc(50% - 15px);
      padding: 2px;
      // background-color: #fff;
      border-radius: 8px;
    }

    div {
      width: 100%;
      overflow: hidden;
      border-radius: 20px;
      // background-color: #f5f5f5;
      font-size: 14px;
      font-weight: 700;
      height: 42px;
      line-height: 42px;
      display: flex;
      cursor: pointer;
      @media screen and (max-width: 768px) {
        div {
          // 頭部個人信息文字
          display: none;
        }
      }
    }

    &__Message2 {
      span {
        margin: 2px;
        color: #e9eef3;
        &:nth-child(2) {
          margin: 0 2px;
          cursor: none;
        }
      }
    }

    // PC端樣式
    @media screen and (min-width: 768px) and (max-width: 1920px) {
      .header__User__Message {
        display: none;
      }
      .header__User__Message2 {
        display: block;
      }
      .header__User__Message2-2 {
        display: flex;
      }
      .header__User__Message2-2 span {
        padding: 4px;
      }
    }
    @media screen and (max-width: 768px) {
      .header__User__Message2 {
        // 頭部個人信息文字
        display: none;
      }
      .header__User__Message2-2 {
        display: none;
      }
    }
  }
}
.main {
  padding: 0.125rem 0;
  overflow: hidden;
  overflow-y: scroll;
}
</style>

<style lang="scss" scoped>
// PC端样式
@media screen and (min-width: 768px) and (max-width: 1920px) {
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
}
// 移动端样式
@media screen and (max-width: 768px) {
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 30px;
  }
}
</style>