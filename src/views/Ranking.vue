<script>
import { GetDailyLeaderboard } from "../API/Details";
export default {
  name: "Ranking",
  components: {},
  data() {
    return {
      extraParams: 1,
      activeName: "threeDays",
      dailyLeaderboard: { page: 1, limit: 12 },
      thisMonthDaysLeaderboard: { page: 1, limit: 12 },
      thisWeekLeaderboard: { page: 1, limit: 12 },
      threeDaysLeaderboard: { page: 1, limit: 12 },
    };
  },
  created() {
    this.getDailyLeaderboard({ worksType: 1, page: 1, limit: 20 });
  },
  methods: {
    getDailyLeaderboard(parame) {
      GetDailyLeaderboard(parame).then(({ data }) => {
        this.dailyLeaderboard = data.data.dailyLeaderboard;
        this.thisMonthDaysLeaderboard = data.data.thisMonthDaysLeaderboard;
        this.thisWeekLeaderboard = data.data.thisWeekLeaderboard;
        this.threeDaysLeaderboard = data.data.threeDaysLeaderboard;
      });
    },
    // 去詳情
    GotoDetails(ID) {
      sessionStorage.setItem("DetailsWorksId", ID);
      this.$router.push({ name: "Details", params: { worksId: ID } });
    },
    // 当日排行榜当前页
    currentChangeHandledailyLeaderboard(val) {
      this.dailyLeaderboard.page = val;
      this.getDailyLeaderboard(this.dailyLeaderboard);
    },
    // 三日排行榜当前页
    currentChangeHandlethreeDaysLeaderboard(val) {
      this.threeDaysLeaderboard.page = val;
      this.getDailyLeaderboard(this.threeDaysLeaderboard);
    },
    // 本周排行榜当前页
    currentChangeHandlethisWeekLeaderboard(val) {
      this.thisWeekLeaderboard.page = val;
      this.getDailyLeaderboard(this.thisWeekLeaderboard);
    },
    // 本月排行榜当前页
    currentChangeHandlethisMonthDaysLeaderboard(val) {
      this.threeDaysLeaderboard.page = val;
      this.getDailyLeaderboard(this.threeDaysLeaderboard);
    },
  },
};
</script>

<template>
  <div class="ranking">
    <el-tabs v-model="activeName">
      <el-tab-pane label="今日排行榜" name="daily">
        <div class="Portfolio">
          <div class="Portfolio-History">
            <div
              class="History"
              v-for="item in dailyLeaderboard.list"
              :key="item.worksId"
              @click="GotoDetails(item.worksId)"
            >
              <div>
                <img :src="item.defaultImage" />
              </div>

              <div>
                <ul v-if="item.reviewStatus === 1">
                  <li>{{ item.worksName }}</li>
                  <li>作者: {{ item.worksCreator }}</li>
                  <li>最近更新: {{ item.editTime }}</li>
                  <li>
                    最新章节:
                    {{ item.worksRenew === 0 ? "无" : item.worksRenew }}
                  </li>
                </ul>
                <ul v-if="item.reviewStatus != 1">
                  <li>{{ item.worksName }}</li>
                  <li v-if="item.reviewStatus === 0">审核中</li>
                  <li v-if="item.reviewStatus === 2">审核失败</li>
                </ul>
              </div>
            </div>
          </div>
          <el-pagination
            v-if="dailyLeaderboard.list != null"
            @current-change="currentChangeHandledailyLeaderboard"
            :current-page="dailyLeaderboard.page"
            :page-size="dailyLeaderboard.limit"
            :total="dailyLeaderboard.count"
            layout="total, prev, pager, next, jumper"
            :small="true"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="三日排行榜" name="threeDays">
        <div class="Portfolio">
          <div class="Portfolio-History">
            <div
              class="History"
              v-for="item in threeDaysLeaderboard.list"
              :key="item.worksId"
              @click="GotoDetails(item.worksId)"
            >
              <div>
                <img :src="item.defaultImage" />
              </div>

              <div>
                <ul v-if="item.reviewStatus === 1">
                  <li>{{ item.worksName }}</li>
                  <li>作者: {{ item.worksCreator }}</li>
                  <li>最近更新: {{ item.editTime }}</li>
                  <li>
                    最新章节:
                    {{ item.worksRenew === 0 ? "无" : item.worksRenew }}
                  </li>
                </ul>
                <ul v-if="item.reviewStatus != 1">
                  <li>{{ item.worksName }}</li>
                  <li v-if="item.reviewStatus === 0">审核中</li>
                  <li v-if="item.reviewStatus === 2">审核失败</li>
                </ul>
              </div>
            </div>
          </div>
          <el-pagination
            v-if="threeDaysLeaderboard.list != null"
            @current-change="currentChangeHandlethreeDaysLeaderboard"
            :current-page="threeDaysLeaderboard.page"
            :page-size="threeDaysLeaderboard.limit"
            :total="threeDaysLeaderboard.count"
            layout="total, prev, pager, next, jumper"
            :small="true"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="本周排行榜" name="thisWeek">
        <div class="Portfolio">
          <div class="Portfolio-History">
            <div
              class="History"
              v-for="item in thisWeekLeaderboard.list"
              :key="item.worksId"
              @click="GotoDetails(item.worksId)"
            >
              <div>
                <img :src="item.defaultImage" />
              </div>

              <div>
                <ul v-if="item.reviewStatus === 1">
                  <li>{{ item.worksName }}</li>
                  <li>作者: {{ item.worksCreator }}</li>
                  <li>最近更新: {{ item.editTime }}</li>
                  <li>
                    最新章节:
                    {{ item.worksRenew === 0 ? "无" : item.worksRenew }}
                  </li>
                </ul>
                <ul v-if="item.reviewStatus != 1">
                  <li>{{ item.worksName }}</li>
                  <li v-if="item.reviewStatus === 0">审核中</li>
                  <li v-if="item.reviewStatus === 2">审核失败</li>
                </ul>
              </div>
            </div>
          </div>
          <el-pagination
            v-if="thisWeekLeaderboard.list != null"
            @current-change="currentChangeHandlethisWeekLeaderboard"
            :current-page="thisWeekLeaderboard.page"
            :page-size="thisWeekLeaderboard.limit"
            :total="thisWeekLeaderboard.count"
            layout="total, prev, pager, next, jumper"
            :small="true"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="今月排行榜" name="thisMonth">
        <div class="Portfolio">
          <div class="Portfolio-History">
            <div
              class="History"
              v-for="item in thisMonthDaysLeaderboard.list"
              :key="item.worksId"
              @click="GotoDetails(item.worksId)"
            >
              <div>
                <img :src="item.defaultImage" />
              </div>

              <div>
                <ul v-if="item.reviewStatus === 1">
                  <li>{{ item.worksName }}</li>
                  <li>作者: {{ item.worksCreator }}</li>
                  <li>最近更新: {{ item.editTime }}</li>
                  <li>
                    最新章节:
                    {{ item.worksRenew === 0 ? "无" : item.worksRenew }}
                  </li>
                </ul>
                <ul v-if="item.reviewStatus != 1">
                  <li>{{ item.worksName }}</li>
                  <li v-if="item.reviewStatus === 0">审核中</li>
                  <li v-if="item.reviewStatus === 2">审核失败</li>
                </ul>
              </div>
            </div>
          </div>
          <el-pagination
            v-if="thisMonthDaysLeaderboard.list != null"
            @current-change="currentChangeHandlethisMonthDaysLeaderboard"
            :current-page="thisMonthDaysLeaderboard.page"
            :page-size="thisMonthDaysLeaderboard.limit"
            :total="thisMonthDaysLeaderboard.count"
            layout="total, prev, pager, next, jumper"
            :small="true"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
// PC端样式
@media screen and (min-width: 768px) and (max-width: 1920px) {
  .UserInfo {
    display: none;
  }
  ::v-deep .el-tabs__nav {
    transform: translateX(130%) !important;
  }
  .Portfolio-History {
    display: flex;
    flex-wrap: wrap;

    .History {
      margin: 0 15px 10px 0;
      img {
        width: 10vw;
        height: 27vh;
      }
      div {
        ul {
          font-size: 14px;
          display: inline-block;
          list-style: none;
          padding: 0 0 0 0;
          margin: 0;
          text-align: left;
        }
        ul li {
          width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0 0 3px 0;
        }
        ul li:first-child {
          text-align: center;
        }
      }
    }
  }
}
// 移动端样式
@media screen and (max-width: 768px) {
  .UserInfo {
    display: none;
  }
  ::v-deep .el-tabs__nav {
    margin-left: 20px;
  }
  ::v-deep .el-tabs__content {
    margin-left: 20px;
  }
  ::v-deep .el-tabs__item {
    padding: 0 16px;
  }
  .Portfolio-History {
    display: flex;
    flex-wrap: wrap;

    .History {
      margin: 0 15px 10px 0;
      img {
        width: 40vw;
        height: 27vh;
      }
      div {
        ul {
          font-size: 14px;
          display: inline-block;
          list-style: none;
          padding: 0 0 0 0;
          margin: 0;
          text-align: left;
        }
        ul li {
          width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0 0 3px 0;
        }
        ul li:first-child {
          text-align: center;
        }
      }
    }
  }
}
</style>
