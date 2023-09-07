<template>
  <div class="WatchImg">
    <!-- <div class="WatchImg__Title">阿斯達薩達撒大·</div> -->
    <div class="WatchImg__Container" style="overflow: auto">

      <el-image
        v-for="data in urls"
        :key="data.url"
        :src="data.url"
        class="lazy-image"
        :title="data.ImageId"
        :lazy="true"
      ></el-image>
    </div>
    <div
      class="WatchImg__Select"
      v-if="this.Works.worksType == 1 || this.Works.worksType == 2"
    >
      <div @click="WatchHistory">返回</div>
      <div @click="GoBackZhang(Number(WorksChapterId) > 1 ? 'up' : 'down')">
        {{ Number(WorksChapterId) > 1 ? "上一章" : "下一章" }}
      </div>
    </div>
  </div>
</template>

<script>
import { Record, GetChapterInfo } from "../API/Details";
export default {
  name: "WatchImg",
  data() {
    return {
      pageCount2: 3, //图片总数
      pageCount: 0, //图片总数
      id: "",
      WorksChapterId: "", //章节ID
      WorksId: "", //作品ID
      Works: {},
      urls: [],
    };
  },
  created() {
    let params = this.$route.params;
    this.pageCount = Number(
      params.pageCount ? params.pageCount : sessionStorage.getItem("pageCount")
    );
    this.Works = params.Works
      ? params.Works
      : JSON.parse(sessionStorage.getItem("Works"));
    this.WorksChapterId = params.WorksChapterId
      ? params.WorksChapterId
      : sessionStorage.getItem("WorksChapterId");
    this.id = params.id ? params.id : sessionStorage.getItem("id");
    this.WorksId = params.WorksId
      ? params.WorksId
      : sessionStorage.getItem("WorksId");

    this.setUrls();
    this.Imggun();
  },
  mounted() {
    setTimeout(() => {
      this.LookHistoryWorks();
    }, 500);
  },
  methods: {
    lazyImg() {
      // // console.log(1);
      // let imgs = document.getElementsByTagName("img");
      // // // 1. 一上来立即执行一次
      // fn();
      // lazyload(fn, true);
      // // // 2. 监听滚动事件
      // // window.onscroll = lazyload(fn, true);
      // function fn() {
      //   // 获取视口高度和内容的偏移量
      //   let offsetHeight =
      //     window.innerHeight || document.documentElement.clientHeight;
      //   Array.from(imgs).forEach((item, index) => {
      //     let oBounding = item.getBoundingClientRect(); //返回一个矩形对象，包含上下左右的偏移值
      //     if (0 <= oBounding.top && oBounding.top <= offsetHeight) {
      //       item.setAttribute("src", item.getAttribute("data-url"));
      //     }
      //   });
      // }
      // // 函数节流
      // function lazyload(fn, immediate) {
      //   let timer = null;
      //   return function () {
      //     let context = this;
      //     if (!timer) {
      //       timer = setTimeout(() => {
      //         fn.apply(this);
      //         timer = null;
      //       }, 500);
      //     }
      //   };
      // }
    },
    setUrls() {
      for (let index = 1; index <= this.pageCount; index++) {
        var url = `
        http://`+process.env.VUE_APP_API_URL+`:8084/api/oss/getWorkContent?ImageDefaultStatus=0&ImageId=${index}&WorksChapterId=${this.id}&WorksId=${this.WorksId}
        `;
        var ImageId = index;
        this.urls.push({ url, ImageId });
      }
    },
    // 回到上一章
    GoBackZhang(data) {
      if (data == "up") {
        if (data == "up") {
          if (this.WorksChapterId == 1) {
            this.$message("已经是第一章了");
          } else {
            this.WorksChapterId = Number(this.WorksChapterId) - 1;
            sessionStorage.setItem("WorksChapterId", this.WorksChapterId);
            window.location.reload();
          }
        }
      } else {
        if (this.WorksChapterId == this.Works.worksRenew) {
          this.$message("已经是最后一章了");
        } else {
          // 如果可以去下一章 就获取章节信息
          GetChapterInfo({
            worksId: this.WorksId,
            cartoonChapterId: Number(this.WorksChapterId),
          }).then((result) => {
            if (result.code == 20000) {
              let data = result.data.data;
              sessionStorage.setItem("id", data.id);
              let id = data.id;
              sessionStorage.setItem("pageCount", data.cartoonPages);
              let WorksChapterId = data.cartoonChapterId;
              sessionStorage.setItem("WorksChapterId", data.cartoonChapterId);
              let cartoonPages = data.cartoonPages;
              sessionStorage.setItem("WorksId", data.worksId);
              this.$router.push({
                name: "WatchImg",
                params: {
                  pageCount: cartoonPages,
                  WorksChapterId,
                  WorksId,
                  id,
                },
              });
            }
          });
        }
      }
    },
    // 绑定滚轮事件 获取图片信息
    Imggun() {
      window.addEventListener("wheel", handleScroll);
      function handleScroll(event) {
        // 获取当前视窗的大小
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        // 获取所有图片元素
        let maxArea = 0;
        let maxImageInfo = null;
        // 选择所有的 <img> 元素

        var images = document.getElementsByTagName("img");
        var visibleImages = [];

        for (var i = 0; i < images.length; i++) {
          var image = images[i];
          var rect = image.getBoundingClientRect();
          // console.log(rect.top);
          // console.log(rect.left);
          // console.log(rect.bottom);
          // console.log(rect.right);
          // console.log(window.innerHeight);
          // console.log(window.innerWidth);
          if (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
              (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right >= 0
          ) {
            visibleImages.push(image);
          }
        }

        // 遍历所有图片元素
        for (let i = 0; i < visibleImages.length; i++) {
          const image = visibleImages[i];
          // 更新最大占比图片的信息
          maxImageInfo = {
            src: image.src,
            alt: image.alt,
            key: image.title,
          };
          sessionStorage.setItem("ImageId", image.title);
        }
      }
    },
    // 添加历史记录
    WatchHistory() {
      var WorksWatchHistoryTo = {
        worksId: this.WorksId,
        cartoonChapterId: this.id,
        //id
        worksHistoryViewingChapterImage: sessionStorage.getItem("ImageId"),
      };
      // this.$router.back()
      Record(WorksWatchHistoryTo)
        .then((result) => {
          if (result.code == 20000) {
            this.$router.back();
          }
        })
        .catch((err) => {
          this.$message.error("历史记录添加/修改失败");
        });
    },
    // 进入历史观看位置
    LookHistoryWorks() {
      let worksHistoryViewingChapterImage = sessionStorage.getItem(
        "worksHistoryViewingChapterImage"
      );
      if (worksHistoryViewingChapterImage) {
        var images = document.getElementsByTagName("img");

        for (var i = 0; i < images.length; i++) {
          var image = images[i];
          if (image.title == worksHistoryViewingChapterImage) {
            // 将元素滚动到可见区域内
            image.scrollIntoView();
            // 使用选项进行精确控制滚动方式
            image.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            // // 计算目标元素相对于文档顶部的偏移量
            // const offsetTop = elementRect.top + window.pageYOffset;

            // // 定义滚动动画的参数
            // const scrollOptions = {
            //   top: offsetTop,
            //   behavior: "smooth", // 添加平滑滚动的行为参数
            // };

            // // 执行滚动动画
            // window.scrollTo(scrollOptions);
            console.log(image);
          }
        }
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("worksHistoryViewingChapterImage")
    next(false);
    this.WatchHistory();
    next();
  },
};
</script>

<style lang="scss" scoped>
.WatchImg {
  width: 100%;
  height: 100%;
  &__Title {
    width: 100%;
    min-height: 20px;
    font-size: 16px;
    color: #a1a1a1;
  }
  &__Container {
    &__Img {
      width: 100%;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  &__Select {
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      //   margin: 0 10px;
      height: 100%;
      width: 100%;
      color: #fff;
      text-align: center;
      background-color: #333;
    }
  }
}
.lazy-image {
  width: 100%;
}
</style>
