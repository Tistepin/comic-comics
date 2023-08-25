<template>
  <div class="UserDetails">
    <div class="UserInfo">
      <el-image :src="url" fit="fit" class="el-image-tou"></el-image>
      <div class="tou-line"></div>
      <div class="Info">
        <span>{{ UserInfo.nickname }}</span>
        <span>上传数量:{{ count.WorksCount }}</span>
        <span>收藏数量:{{ count.BookShelf }}</span>
        <div class="sign">
          <span>签名:{{ UserInfo.sign }}</span>
        </div>
      </div>
    </div>
    <div class="UserInfo-main">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户信息" name="first">
          <div class="UserInfo-details">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules" label-position="left">
              <el-form-item label="用户姓名">
                <span style="">{{ form.username }}</span>
              </el-form-item>
              <el-form-item label="昵称">
                <span style="">{{ form.nickname }}</span>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                <el-input :clearable="true" v-model="form.phone"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱" prop="email">
                <el-input :clearable="true" v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="签名" >
                <el-input
                  type="textarea"
                  :clearable="true"
                  v-model="form.sign"
                ></el-input>
              </el-form-item>
              <el-form-item label="生日信息" >
                <div class="block">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="form.birth"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>

              <el-form-item style="height: 40px;">
                <el-button type="primary" @click="subitUserInfo">
                  提交</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="作品上传" name="second">
          <el-radio v-model="radio" label="1" @input="updateWorksType"
            >漫画</el-radio
          >
          <el-radio v-model="radio" label="2" @input="updateWorksType"
            >小说</el-radio
          >
          <el-radio v-model="radio" label="3" @input="updateWorksType"
            >插图</el-radio
          >
          <div class="WorksInfo-details">
            <el-form
              ref="form"
              :model="works"
              label-width="80px"
              :rules="rules"
              style="margin-top: 20px;"
            >
              <el-form-item
                label="作品名字"
                label-width="100px"
              >
                <el-input
                  :clearable="true"
                  v-model="works.worksName"
                  @blur="uploadUrlfun"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="作品封面"
                label-width="100px"
              >
                <el-upload
                  class="upload-demo"
                  :action="uploadurl"
                  :on-success="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  list-type="picture"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item
                label="作品创作者"
                label-width="100px"
              >
                <el-input
                  :clearable="true"
                  v-model="works.worksCreator"
                  @blur="uploadUrlfun"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="作品开本时间"
                label-width="100px"
              >
                <div class="block">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="works.worksCreateTime"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item
                label="作品创作地区"
                label-width="100px"
              >
                <el-select v-model="works.worksArea" placeholder="请选择">
                  <el-option
                    v-for="item in AreaList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="作品状态"
                label-width="100px"
                v-if="radio!=3"
              >
                <el-radio v-model="works.worksStatus" label="1"
                  >更新中</el-radio
                >
                <el-radio v-model="works.worksStatus" label="2">完结</el-radio>
              </el-form-item>
              <el-form-item
                label="作品题材"
                label-width="100px"
              >
                <el-select
                  v-model="CategoryListChange"
                  placeholder="请选择"
                  multiple
                  @change="CategoryChange"
                >
                  <el-option
                    v-for="item in CategoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="作品描述" label-width="100px">
                <el-input
                  v-model="works.worksDescribe"
                  type="textarea"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item style="height: 40px;">
                <el-button type="primary" @click="saveWorksInfo">
                  提交</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="作品集" name="third">
          <div class="Portfolio">
            <div class="Portfolio-History">
              <div
                class="History"
                v-for="item in dataList"
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
              @size-change="sizeChangeHandle"
              @current-change="currentChangeHandle"
              :current-page="page.pageIndex"
              :page-sizes="[12, 20, 50, 100]"
              :page-size="page.pageSize"
              :total="page.totalPage"
              layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传章节" name="fourth">
          <uploadchapter />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { GetUserInfo, UpdateUser } from "../../API/User";
import {
  GetWorksCount,
  GetCollectCount,
  uploadWork,
  GetWorksList,
} from "../../API/Details";
import { GetAreaDownList, GetCategoryDownList } from "../../API/DownList";
import uploadchapter from "../../components/uploadchapter.vue";
import { Remove } from "../../API/oss";
export default {
  name: "UserDetails",
  components: { uploadchapter },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        var a =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
            this.form.phone
          );
        if (a) {
          callback();
        }
        callback(new Error("请输入正确手机号"));
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        var a =
          /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test(
            this.form.email
          );
        if (a) {
          callback();
        }
        callback(new Error("请输入正确邮箱"));
      }
    };
    return {
      fileList: [],
      works: {
        worksName: "",
        defaultImage: "",
        worksCreator: "",
        worksCreateTime: "",
        worksArea: "",
        worksType: "1",
        worksDescribe: "",
        worksCategory: "",
        worksStatus: "",
      },
      radio: "1",
      uploadType: "",
      activeName: "second",
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      UserInfo: {},
      count: {
        WorksCount: 0,
        BookShelf: 0,
      },
      form: {},
      rules: {
        phone: [{ validator: validatePass, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
      },
      uploadurl: "ComicA/oss/policy3?WorksName=",
      AreaList: [],
      CategoryList: [],
      CategoryListChange: [],
      WorksListParams: {
        page: 1,
        limit: 12,
        reviewStatus: null,
        deleteStatus: 1,
      },
      page: {
        pageIndex: 1,
        pageSize: 12,
        totalPage: 0,
      },
      dataList: [],
    };
  },
  created() {
    this.getUserInfo();
    this.getWorksCount();
    this.getCollectCount();
    this.getAreaDownList();
    this.getCategoryDownList();
    this.getWorksList();

  },
  methods: {
    // 获取用户的上传的作品集
    getWorksList() {
      let parame = this.WorksListParams;
      parame.page = this.page.pageIndex;
      parame.limit = this.page.pageSize;
      GetWorksList(parame).then(({ data }) => {
        if (data.page != null) {
          this.dataList = data.page.list;
          this.page.totalPage = data.page.totalCount;
        }
      });
    },
    // 获取地区下拉框
    getAreaDownList() {
      GetAreaDownList().then(({ data }) => {
        if (data.list != null) {
          this.AreaList = data.list;
        }
      });
    },
    // 获取题材下拉
    getCategoryDownList() {
      GetCategoryDownList({ worksTyp: this.radio }).then(({ data }) => {
        if (data.list != null) {
          this.CategoryList = data.list;
        }
      });
    },
    // 获取用户信息
    getUserInfo() {
      GetUserInfo().then(({ data }) => {
        if (data.data != null) {
          this.UserInfo = data.data;
          this.form = data.data;
        }
      });
    },
    // 该用户上传的作品的总数
    getWorksCount() {
      GetWorksCount().then(({ data }) => {
        if (data.Count != null) {
          this.count.WorksCount = data.Count;
        }
      });
    },
    // 收藏数量总数
    getCollectCount() {
      GetCollectCount().then(({ data }) => {
        if (data.Count != null) {
          this.count.BookShelf = data.Count;
        }
      });
    },
    subitUserInfo() {
      UpdateUser(this.form).then((result) => {
        if (result.code === 20000) {
          location.reload();
        }
      });
    },
    uploadUrlfun() {
      this.uploadurl = "ComicA/oss/policy3?WorksName=";
      this.uploadurl += this.works.worksName;
    },
    handlePreview(file) {
      this.works.defaultImage = file.data.url;
    },
    handleRemove({response}) {
      Remove({url:response.data.url}).then((result) => {
        this.$message.success("移除成功");
      })
    },
    // 修改上传作品类型
    updateWorksType() {
      this.works.worksType = this.radio;
    },
    // 多选下拉改变事件
    CategoryChange(list) {
      this.works.worksCategory = list.join() + ",";
    },
    saveWorksInfo() {
      if(this.radio==3){
        this.works.worksStatus=2
      }
      uploadWork(this.works).then((result) => {
        if (result.code === 20000) {
          location.reload();
        }
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.page.pageSize = val;
      this.page.pageIndex = 1;
      this.getWorksList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.page.pageIndex = val;
      this.getWorksList();
    },
    // 去詳情
    GotoDetails(ID) {
      sessionStorage.setItem("DetailsWorksId", ID);
      this.$router.push({ name: "Details", params: { worksId: ID } });
    },
  },
};
</script>

<style  lang="scss" scoped>
// PC端样式
@media screen and (min-width: 768px) and (max-width: 1920px) {
  .UserDetails {
    display: flex;
  }
  .UserInfo {
    width: 20vw;
    height: 40vh;
    background-color: #fff;
  }
  .el-image-tou {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 10px 0px 0px 0px;
  }
  .tou-line {
    border: 1px solid #666;
    width: 97%;
    margin: auto;
  }
  .Info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .Info span {
    margin: 10px;
  }
  .sign {
    width: 150px;
    height: 150px;
    display: block;
    word-wrap: break-word;
    word-break: break-all;
  }
  .UserInfo-main {
    width: 100%;
    margin-left: 10px;
    background-color: #fff;
    padding: 5px;
  }
  .UserInfo-details .el-form {
    width: 60%;
    margin: auto;
  }
  .Portfolio-History {
    display: flex;
    flex-wrap: wrap;
    margin: 0 0 0 30px;

    .History {
      margin: 0 19px 10px 0;
      img {
        width: 9vw;
        height: 20vh;
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
  ::v-deep .el-tabs__nav{
    margin-left: 20px;
  }
  ::v-deep .el-tabs__content{
    margin: 20px;
  }
  ::v-deep  .el-button--primary{
    position: absolute;
    left: 20px;
  }
    .Portfolio-History {
    display: flex;
    flex-wrap: wrap;

    .History {
      margin: 0 10px 10px 0;
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