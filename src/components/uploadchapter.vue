<template>
  <div class="uploadchapter">
    <!-- <el-radio v-model="radioType" label="1">小说</el-radio> -->
    <el-radio v-model="radioType" label="2">漫画</el-radio>
    <!-- <el-radio v-model="radioType" label="3">插图</el-radio> -->
    <div v-if="radioType == 2" class="UploadType">
      <el-radio v-model="radio" label="1"> 压缩包方式 </el-radio>
      <el-radio v-model="radio" label="2">图片方式</el-radio>
      <el-form
        ref="form"
        :model="CartoonWorksDetailsEntityTo"
        label-width="100px"
      >
        <el-form-item label="作品名称">
          <el-select
            v-model="CartoonWorksDetailsEntityTo.worksId"
            placeholder="请选择"
            @change="ChangeWorkName"
            style="margin-top: 10px"
          >
            <el-option
              v-for="item in CartoonWorksDetailsList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <el-popover
                v-if="item.label.length > 15"
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <p>{{ item.label }}</p>
                <span slot="reference">{{
                  item.label.slice(0, 15) + "..."
                }}</span>
              </el-popover>
              <span v-else>{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="第几章" v-if="ynused == 1">
          <el-input
            v-model="CartoonWorksDetailsEntityTo.cartoonChapterId"
            @blur="cartoonChapterIdBlur"
          ></el-input>
        </el-form-item>
        <el-form-item label="章节名称" v-if="ynused == 1">
          <el-input
            v-model="CartoonWorksDetailsEntityTo.cartoonChapterName"
          ></el-input>
        </el-form-item>
        <div v-if="ynused == 1">
          <el-form-item label="上传压缩包" v-if="radio == 1">
            <el-upload
              class="upload-demo"
              drag
              accept=".rar,.zip"
              :action="actionUrl"
              :multiple="false"
              :headers="headers"
              :limit="1"
              :on-success="handleUploadSuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传 .zip格式文件 格式 压缩包名为章节名 图片名按顺序数字
                例如 第一话 压缩包名为1 例如 图片 第一页图片为1 第二页为2
                以此类推
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传图片集" v-if="radio == 2">
            <el-upload
              class="upload-demo"
              :action="uploadpolicy2"
              :on-change="handleChange"
              :on-success="handleUploadSuccess"
              :on-remove="handleRemove"
              :file-list="fileList"
              :multiple="true"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </div>
        <el-form-item v-if="ynused == 1" style="height: 40px">
          <el-button type="primary" @click="SubChapter">立即上传</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { GetWorksDownList, SaveUploadWorskData } from "../API/Details";
import { Remove } from "../API/oss";

export default {
  name: "uploadchapter",
  data() {
    return {
      ynused: 0,
      radioType: "2",
      radio: "2",
      actionUrl: "ComicA/oss/policy4",
      uploadpolicy2: "ComicA/oss/policy2",
      headers: {
        jwt: sessionStorage.getItem("FantasyTimetoken"),
      },
      CartoonWorksDetailsEntityTo: {
        worksId: null,
        cartoonChapterId: null,
        cartoonChapterName: "",
        cartoonPages: "",
        worksChapterLocations: [],
      },
      CartoonWorksDetailsList: [],
      fileList: [],
    };
  },
  created() {
    this.getWorksDownList();
  },
  methods: {
    SubChapter() {
      SaveUploadWorskData(this.CartoonWorksDetailsEntityTo).then((result) => {
        if (result.code === 20000) {
          location.reload();
        }
      });
    },
    // 获取作品下拉框
    getWorksDownList() {
      GetWorksDownList().then(({ data }) => {
        if (data.list != null) {
          this.CartoonWorksDetailsList = data.list;
        }
      });
    },
    ChangeWorkName(id) {
      let resultArr = this.CartoonWorksDetailsList.find((item) => {
        return item.value == id;
      });
      this.actionUrl = "ComicA/oss/policy4";
      this.uploadpolicy2 = "ComicA/oss/policy2";
      this.actionUrl += "?WorksName=" + resultArr.label;
      this.uploadpolicy2 += "?WorksName=" + resultArr.label;
      this.ynused = 1;
    },
    handleUploadSuccess(res, file) {
      this.CartoonWorksDetailsEntityTo.worksChapterLocations = res.data.url;
      this.$message.success("上传" + res.message);
    },
    //预览
    handlePreview(file) {
      this.$message.success("压缩文件无法预览！");
    },
    handleRemove(file, fileList) {
      this.$message.success("移除" + file.response.message);
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice();
      // this.CartoonWorksDetailsEntityTo.worksChapterLocations.push()
    },
    handleRemove({ response }) {
      Remove({ url: response.data.url }).then((result) => {
        this.$message.success("移除成功");
      });
    },
    handleUploadSuccess(res, file) {
      this.CartoonWorksDetailsEntityTo.worksChapterLocations=(res.data.url);
      this.$message.success("上传" + res.message);
    },
    cartoonChapterIdBlur() {
      this.uploadpolicy2 +=
        "&worksChapterId=" + this.CartoonWorksDetailsEntityTo.cartoonChapterId;
    },
  },
};
</script>
<style  lang="scss" scoped>
// 移动端样式
@media screen and (max-width: 768px) {
  .UploadType {
    margin-top: 15px;
  }
}
</style>