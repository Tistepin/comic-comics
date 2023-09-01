<template>
  <div class="Personal">
    <el-container>
      <el-header>
        <!-- <div class="back" @click="$router.back()">
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
        </div> -->
        <div class="title">{{ title }}</div>
      </el-header>
      <el-main>
        <div
          class="History"
          v-for="item in history"
          :key="item.worksId"
          @click="GotoDetails(item.worksId)"
        >
          <div>
            <img :src="item.defaultImage" />
          </div>
          <div>
            <ul>
              <li>{{ item.worksName }}</li>
              <li>作者: {{ item.worksCreator }}</li>
              <li>最近更新时间: {{ item.editTime }}</li>
              <li>最新章节: {{ item.latestChapter }}</li>
            </ul>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { GetWorksWatchHistory, GetWorksBookshelf } from "../API/Details";
import { Login } from "../API/login";
export default {
  name: "Personals",
  data() {
    return {
      title: "",
      UserName: "",
      history: [],
      params: {
        worksType: 1,
        page: 1,
        limit: 20,
      },
    };
  },
  created() {
    this.initData();
  },
  methods: {
    // 初始化函数
    initData() {
      var FantasyTimetoken =sessionStorage.getItem("FantasyTimetoken");
      if (FantasyTimetoken) {
        this.UserName = sessionStorage.getItem("UserName");
      }
      if (this.$route.query.key == "Bookshelf") {
        this.title = "书架";
        this.getWorksBookShelf();
      } else {
        this.title = "历史观看记录";
        this.getWorksWatchHistory();
      }
    },
    // 获取历史记录
    getWorksWatchHistory() {
      GetWorksWatchHistory().then((res) => {
        if (res.code == 20000) {
          this.history = res.data.WorksWatchHistory;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getWorksBookShelf() {
      GetWorksBookshelf(this.params).then((res) => {
        if (res.code == 20000) {
          this.history = res.data.page.list;
          // this.history = res.data.WorksWatchHistory;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 去詳情
    GotoDetails(ID) {
      sessionStorage.setItem("DetailsWorksId", ID);
      this.$router.push({ name: "Details", params: { worksId: ID } });
    },
  },
};
</script>
<style lang="scss" scoped>
// PC端樣式
@media screen and (min-width: 768px) and (max-width: 1920px) {
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
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start
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
    .History {
      margin: 0 15px 10px 0;
      width: 25vw;
      height: 23vh;
      display: flex;
      div{

      }
      img {
        width: 10vw;
        height: 20vh;
      }
      div {
        ul {
          display: inline-block;
          list-style: none;
          padding: 0 0 0 10px;
          margin: 0;
          text-align: left;
        }
        ul li {
          margin: 0 0 10px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 15vw;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
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
    .History {
      display: flex;
      margin: 0 0 10px 0;
      img {
        width: 30vw;
        height: 20vh;
      }
      div {
        ul {
          display: inline-block;
          list-style: none;
          padding: 0 0 0 10px;
          margin: 0;
          text-align: left;
        }
        ul li {
          margin: 0 0 10px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 50vw;
        }
      }
    }
  }
}
</style>
