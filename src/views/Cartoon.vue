<script>
import { GetCategory, GetArea, GetWorks } from "../API/index";
import { getWorks } from "../API/contact";
export default {
  name: "Cartoon",
  components: {},
  data() {
    return {
      IsAreaActiveID: 1,
      IsClassifyID: 1,
      IsSerialsID: 0,
      IsConditionID: 0,

      // 地区 worksArea=1&worksCategory=2&worksStatus=1&worksType=1
      CartoonArea: [],
      // 类型
      CartoonClassify: [],
      // 是否完结 ，连载
      CartoonSerialsData: [
        { name: "全部", CARID: 0 },
        { name: "连载中", CARID: 1 },
        { name: "完结", CARID: 2 },
      ],
      // 条件分类
      CartoonCondition: [
        { name: "全部", CARID: 0 },
        { name: "评分最高", CARID: 1 },
        { name: "最新发布", CARID: 2 },
        { name: "最近更新", CARID: 3 },
        { name: "人气最旺", CARID: 4 },
      ],
      // 条件查询参数
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
      PageTotal: 0, //总数
      //  条件查询结果
      getWordsData: [],
    };
  },
  created() {
    this.getCategory();
    this.getWorks();
  },
  methods: {
    getCategory() {
      GetArea().then((res) => {
        this.CartoonArea = res.data.data;
      });
      GetCategory().then((res) => {
        this.CartoonClassify = res.data.data;
      });
    },
    // 获取条件选择后的数据
    getWorks() {
      getWorks(this.HandleQuery).then((res) => {
        if (res.Code == 20000) {
          this.getWordsData = res.Rows;
          this.PageTotal = res.Total;
        }
      });
      // GetWorks(this.HandleQuery).then((res) => {
      // if (res.code == 20000) {
      //   this.getWordsData = res.data.data.works;
      //   this.PageTotal = res.data.data.total;
      // }
      // });
    },

    // 地区
    AreaClick(ID) {
      this.IsAreaActiveID = ID;
      this.HandleQuery.worksArea = ID;
      this.getWorks();
    },
    // 类型--题材
    ClassifyClick(ID) {
      this.IsClassifyID = ID;
      this.HandleQuery.worksCategory = ID;
      this.getWorks();
    },
    // 是否完结
    SerialsClick(ID) {
      this.IsSerialsID = ID;
      this.HandleQuery.worksStatus = ID;
      this.getWorks();
    },
    // 评分条件
    ConditionClick(ID) {
      if (ID == 1) {
        this.HandleQuery.highestRated = true;
        this.HandleQuery.latestRelease =
          this.HandleQuery.recentlyUpdated =
          this.HandleQuery.theMostPopular =
            false;
      } else if (ID == 2) {
        this.HandleQuery.latestRelease = true;
        this.HandleQuery.highestRated =
          this.HandleQuery.recentlyUpdated =
          this.HandleQuery.theMostPopular =
            false;
      } else if (ID == 3) {
        this.HandleQuery.recentlyUpdated = true;
        this.HandleQuery.highestRated =
          this.HandleQuery.latestRelease =
          this.HandleQuery.theMostPopular =
            false;
      } else if (ID == 4) {
        this.HandleQuery.theMostPopular = true;
        this.HandleQuery.highestRated =
          this.HandleQuery.recentlyUpdated =
          this.HandleQuery.latestRelease =
            false;
      }
      this.IsConditionID = ID;
      this.getWorks();
    },
    PrevClick(num) {
      this.HandleQuery.pageNum = num;
      this.getWorks();
    },
    NextClick(num) {
      this.HandleQuery.pageNum = num;
      this.getWorks();
    },
    currentPageChange(num) {
      this.HandleQuery.pageNum = num;
      this.getWorks();
    },
    // 去詳情
    GotoDetails(item) {
      sessionStorage.setItem("DetailsWorksId", item.worksId);
      this.$router.push({ name: "Details", params: { worksId: item.worksId } });
    },
  },
  watch: {
    "$store.state.SearchStore.WorksData": {
      deep: true, //深度监听设置为 true
      immediate: true,
      handler: function (newVal, oldVal) {
        this.getWordsData = newVal;
      },
    },
  },
};
</script>

<template>
  <div class="Cartoon">
    <div class="Cartoon__CategoryRetrieval">
      <div class="Cartoon__CategoryRetrieval__list">
        <span
          :class="IsAreaActiveID == item.id ? 'CartoonActive' : ''"
          v-for="item in CartoonArea"
          :key="item.id"
          @click="AreaClick(item.id)"
          >{{ item.name }}</span
        >
      </div>
      <div class="Cartoon__CategoryRetrieval__list">
        <span
          :class="IsClassifyID == item.catId ? 'CartoonActive' : ''"
          v-for="item in CartoonClassify"
          :key="item.catId"
          @click="ClassifyClick(item.catId)"
          >{{ item.name }}</span
        >
      </div>
      <div class="Cartoon__CategoryRetrieval__list">
        <span
          :class="IsSerialsID == item.CARID ? 'CartoonActive' : ''"
          v-for="item in CartoonSerialsData"
          :key="item.CARID"
          @click="SerialsClick(item.CARID)"
          >{{ item.name }}</span
        >
      </div>
      <div class="Cartoon__CategoryRetrieval__list">
        <span
          :class="IsConditionID == item.CARID ? 'CartoonActive' : ''"
          v-for="item in CartoonCondition"
          :key="item.CARID"
          @click="ConditionClick(item.CARID)"
          >{{ item.name }}</span
        >
      </div>
    </div>
    <div class="Cartoon__CategorySearchDisplay">
      <div class="Cartoon__CategorySearchDisplay__Container">
        <div class="Cartoon__CategorySearchDisplay__Container__Content">
          <div
            class="
              Cartoon__CategorySearchDisplay__Container__Content__DescribeBox
            "
            v-for="item in getWordsData"
            :key="item.worksId"
            @click="GotoDetails(item)"
          >
            <div
              class="
                Cartoon__CategorySearchDisplay__Container__Content__DescribeBox_Img
              "
            >
              <img :src="item.defaultImage" alt="" />
            </div>
            <div
              class="
                Cartoon__CategorySearchDisplay__Container__Content__DescribeBox_Title
              "
            >
              {{ item.worksName }}
              <div
                class="
                  Cartoon__CategorySearchDisplay__Container__Content__DescribeBox_Title_Describe
                "
              >
                {{ item.worksDescribe }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        small
        :page-size="HandleQuery.pageSize"
        layout="prev, pager, next"
        :total="PageTotal"
        @prev-click="PrevClick"
        @next-click="NextClick"
        @current-change="currentPageChange"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Cartoon {
  // 标签分类部分
  &__CategoryRetrieval {
    &__list {
      padding: 8px 10px;
      margin-bottom: 1px;
      background-color: #fff;
      width: 100%;
      height: 100%;
      // display: flex;
      text-align: left;
      span {
        display: inline-block;
        font-size: 12px;
        padding: 5px;
        margin-right: 5px;
        cursor: pointer;
        &.CartoonActive {
          color: orange;
        }
      }
    }
  }

  // 图片内容展示部分
  &__CategorySearchDisplay {
    background-color: #fff;
    height: calc(100vh - 207px - 120px);
    overflow-y: hidden;
    // overflow: hidden;
    overflow-y: scroll;
    &__Container {
      &__Content {
        padding: 0 20px 10px;
        margin: 10px 0;
        flex-wrap: wrap;
        display: flex;
        overflow: hidden;
        &__DescribeBox {
          // width: 90px;
          width: calc((100% - 36px) / 3);
          cursor: pointer;
          font-size: 12px;
          margin-top: 5px;
          margin-right: 18px;

          &_Img {
            height: 120px;
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
            img {
              height: 100%;
              width: 100%;
            }
          }
          &_Title {
            font-weight: bold;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            &_Describe {
              font-weight: 500;
              font-size: 12px;
              color: #a1a1a1;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              -o-text-overflow: ellipsis;
            }
          }
          @media screen and (max-width: 768px) {
            &:nth-of-type(3n + 0) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
