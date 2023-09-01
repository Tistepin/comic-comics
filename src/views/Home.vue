<script>
import {
  GetPopularSerial,
  GetRecommendedToday,
  GetLatestCreation,
  GetClassicEnd,
  GetWorkContent,
} from "../API/index.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      HotSerialsData: [], //热门连载
      RecommendToday: [], //今日推荐
      LatestCreation: [], //最新作品
      ClassicEndData: [], //经典完结 前十本
    };
  },
  created() {
    this.getPopularSerial();
  },
  methods: {
    //獲取热门连载 前十本
    getPopularSerial() {
      GetPopularSerial({ area: null, worksType: 1 }).then((res) => {
        this.HotSerialsData = res.data.data;
      });
      GetRecommendedToday({ worksType: 1 }).then((res) => {
        this.RecommendToday = res.data.data;
      });
      GetLatestCreation({ worksType: 1 }).then((res) => {
        this.LatestCreation = res.data.data;
      });
      GetClassicEnd({ worksType: 1 }).then((res) => {
        this.ClassicEndData = res.data.data;
      });
    },
    // 去分類
    GotoCartoonPage() {
      this.$router.push("/Cartoon");
    },
    // 去詳情
    GotoDetails(ID) {
      sessionStorage.setItem("DetailsWorksId", ID);
      this.$router.push({ name: "Details", params: { worksId: ID } });
    },
  },
};
</script>

<template>
  <div class="Home">
    <div class="Home__Container">
      <div class="Home__Container__TitleContent">
        <div class="Home__Container__TitleContent_Title">● 热门连载</div>
        <div
          class="Home__Container__TitleContent_More"
          @click="GotoCartoonPage"
        >
          <div>更多</div>
          <img src="../assets/image/more.png" class="rightImg" />
        </div>
      </div>
      <div class="Home__Container__Content">
        <div
          class="Home__Container__Content__DescribeBox"
          v-for="item in HotSerialsData"
          :key="item.worksId"
          @click="GotoDetails(item.worksId)"
        >
          <div class="Home__Container__Content__DescribeBox_Img">
            <img :src="item.defaultImage" alt="" />
          </div>
          <div class="Home__Container__Content__DescribeBox_Title">
            {{ item.worksName }}
            <div class="Home__Container__Content__DescribeBox_Title_Describe">
              {{ item.worksDescribe }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Home__Container">
      <div class="Home__Container__TitleContent">
        <div class="Home__Container__TitleContent_Title">● 今日推荐</div>
        <div
          class="Home__Container__TitleContent_More"
          @click="GotoCartoonPage"
        >
          <div>更多</div>
          <img src="../assets/image/more.png" class="rightImg" />
        </div>
      </div>
      <div class="Home__Container__Content">
        <div
          class="Home__Container__Content__DescribeBox"
          v-for="item in RecommendToday"
          :key="item.worksId"
          @click="GotoDetails(item.worksId)"
        >
          <div class="Home__Container__Content__DescribeBox_Img">
            <img :src="item.defaultImage" alt="" />
          </div>
          <div class="Home__Container__Content__DescribeBox_Title">
            {{ item.worksName }}
            <div class="Home__Container__Content__DescribeBox_Title_Describe">
              {{ item.worksDescribe }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Home__Container">
      <div class="Home__Container__TitleContent">
        <div class="Home__Container__TitleContent_Title">● 最新作品</div>
        <div
          class="Home__Container__TitleContent_More"
          @click="GotoCartoonPage"
        >
          <div>更多</div>
          <img src="../assets/image/more.png" class="rightImg" />
        </div>
      </div>
      <div class="Home__Container__Content">
        <div
          class="Home__Container__Content__DescribeBox"
          v-for="item in LatestCreation"
          :key="item.worksId"
          @click="GotoDetails(item.worksId)"
        >
          <div class="Home__Container__Content__DescribeBox_Img">
            <img :src="item.defaultImage" alt="" />
          </div>
          <div class="Home__Container__Content__DescribeBox_Title">
            {{ item.worksName }}
            <div class="Home__Container__Content__DescribeBox_Title_Describe">
              {{ item.worksDescribe }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Home__Container">
      <div class="Home__Container__TitleContent">
        <div class="Home__Container__TitleContent_Title">● 经典完结</div>
        <div
          class="Home__Container__TitleContent_More"
          @click="GotoCartoonPage"
        >
          <div>更多</div>
          <img src="../assets/image/more.png" class="rightImg" />
        </div>
      </div>
      <div class="Home__Container__Content">
        <div
          class="Home__Container__Content__DescribeBox"
          v-for="item in LatestCreation"
          :key="item.worksId"
          @click="GotoDetails(item.worksId)"
        >
          <div class="Home__Container__Content__DescribeBox_Img">
            <img :src="item.defaultImage" alt="" />
          </div>
          <div class="Home__Container__Content__DescribeBox_Title">
            {{ item.worksName }}
            <div class="Home__Container__Content__DescribeBox_Title_Describe">
              {{ item.worksDescribe }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Home {
  &__Container {
    background-color: #fff;
    &__TitleContent {
      // background-color: red;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 5px 0;
      &_Title {
        font-size: 20px;
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
          height: 16px;
          margin: 0 10px 0 5px;
        }
      }
    }
    &__Content {
      padding: 10px 20px;
      margin: 10px 0;
      flex-wrap: wrap;
      display: flex;
      max-height: 319px;
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

    &:last-child &__Content {
      margin: 0;
    }
  }
}
</style>
