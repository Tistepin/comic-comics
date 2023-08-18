<template>
  <div class="Illustration">
    <el-image
      class="Illustration-list-image"
      v-for="item in ImageList"
      :src="item.defaultImage"
      :key="item.worksId"
      @load="urlInfo"
      @click="GotoDetails(item)"
    ></el-image>
  </div>
</template>

<script>
import { GetIllustration } from "../API/Details";
export default {
  data() {
    return {
      ImageList: [],
    };
  },
  created() {
    this.getIllustration();
  },
  methods: {
    getIllustration() {
      GetIllustration()
        .then((result) => {
          if (result.code == 20000) {
            this.ImageList = result.data.list;
          }
        })
        .catch((err) => {});
    },
    urlInfo(e) {},
    // 去詳情
    GotoDetails(item) {
      sessionStorage.setItem("DetailsWorksId", item.worksId);
      this.$router.push({
        name: "Details",
        params: { worksId: item.worksId, worksType: item.worksType },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// PC端样式
@media screen and (min-width: 768px) and (max-width: 1920px) {
  .Illustration {
    text-align: initial;
    .el-image {
      width: 10%;
      height: 10%;
      margin: 10px;
    }
  }
}
// 移动端样式
@media screen and (max-width: 768px) {
  .Illustration {
    column-count: 2;
    padding: 0px 10px;
    .el-image {
      text-align: center;
      margin: 10px 0px 0 0;
    }
  }
}
</style>