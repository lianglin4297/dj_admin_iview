<!--
 * @Description: 修改，新增文章页面
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-09 16:48:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-26 22:36:39
 -->
<template>
  <div>
    <Form ref="article" :model="article" :rules="rules" :label-width="80">
      <FormItem label="文章标题" prop="title">
        <Input v-model="article.title" placeholder="请输入文章标题" />
      </FormItem>
      <FormItem label="文章内容">
        <editor :editorContent.sync="editorContent" :content="editorContent"></editor>
      </FormItem>
      <FormItem label="文章类型" prop="type">
        <RadioGroup v-model="article.type">
          <span @click="dianji(index=0)">
            <Radio label="0">党内通知</Radio>
          </span>
          <span @click="dianji(index=1)">
            <Radio label="1">党建动态</Radio>
          </span>
          <span @click="dianji(index=2)">
            <Radio label="2">必学要闻</Radio>
          </span>
          <span @click="dianji(index=3)">
            <Radio label="3">热点新闻</Radio>
          </span>
          <span @click="dianji(index=4)">
            <Radio label="4">视频</Radio>
          </span>
        </RadioGroup>
      </FormItem>
      <FormItem :label="imgTitle">
        <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          type="drag"
          :data="paramsData"
          :action="fileId"
          style="display: inline-block;width:200px;"
          :before-upload="beforeFileUpload"
        >
          <div style="width: 200px;height:200px;line-height: 200px;" v-if="isImg">
            <img v-if="imageUrl" :src="imageUrl" style="width:100%;height:100%" />
            <Icon v-else type="ios-image" size="100"></Icon>
          </div>
          <div style="width: 200px;height:200px;line-height: 200px;" v-else>
            <video v-if="imageUrl" :src="imageUrl" style="width:100%;height:100%" />
            <Icon v-else type="logo-youtube" size="100"></Icon>
          </div>
        </Upload>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('article')" v-if="ifAdd">发布文章</Button>
        <Button type="primary" @click="handleSubmit('article')" v-else>修改文章</Button>
        <Button @click="handleReset('article')" style="margin-left: 8px">取消发布</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import editor from "../common/editor";
import * as api from "../../api/api";
export default {
  data() {
    return {
      article: {
        title: "",
        type: ""
      },
      editorContent: "",
      rules: {
        title: [
          { required: true, message: "文章标题不能为空", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择文章类型", trigger: "change" }]
      },
      uploadList: [],
      file: "",
      imageUrl: "",
      ifAdd: true,
      imgTitle: "文章封面",
      articleType: 1,
      isImg: true
    };
  },
  components: {
    editor
  },
  computed: {
    fileId() {
      return "/api/file/upload" + this.file;
    },
    paramsData() {
      let fileType = {
        fileType: this.articleType
      };
      return fileType;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadingFalse();
    });
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        var params = {};
        var buttonId = this.$route.params.id;
        console.log("buttonId",buttonId)
        if (valid) {
          if (buttonId == 1) {
            params = {
              title: this.article.title,
              content: this.editorContent,
              type: this.article.type,
              url: this.imageUrl
            };
            console.log("1-----params",params)
            this.$post(api.addArticle, params).then(res => {
              this.$Message.success(res.message);
            });
          } else {
            params = {
              articleId: this.$route.params.row.articleId,
              author: this.$route.params.row.author,
              viewCount:this.$route.params.row.viewCount,
              title: this.article.title,
              content: this.editorContent,
              type: this.article.type,
              url: this.imageUrl
            };
            console.log("2-----params",params)
            this.$post(api.updateArticle, params).then(res => {
              console.log("res===>",res)
              this.$Message.success(res.message);
            });
          }
          this.handleReset("article");
        } else {
          this.$Message.error("请填写文章相关信息");
        }
      });
    },
    // 取消发布
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$router.go(-1);
    },
    // 上传图片成功的回调函数
    handleSuccess(file) {
      if (file.code == 20001) {
        this.imageUrl ="/api" + file.data;
        this.$Message.success(file.message);
      }
    },
    getUpdateArticle() {
      var getArticle = this.$route.params.row;
      if (getArticle == undefined) {
        var getArticle = JSON.parse(localStorage.getItem("getArticle"));
      }
      this.article.title = getArticle.title;
      this.editorContent = getArticle.content;
      this.article.type = `${getArticle.type}`;
      this.imageUrl = "/api" + getArticle.url;
    },
    loadingFalse() {
      this.$Spin.hide();
      var id = this.$route.params.id;
      if (id == 1) return;
        this.ifAdd = false;
        this.getUpdateArticle();
        this.dianji(this.article.type)
      
    },
    beforeFileUpload(file) {
      var FileExt = file.name.replace(/.+\./, "");
     if (this.article.type == 4) {
        if (["mp4"].indexOf(FileExt.toLowerCase()) === -1) {
          this.$Message.error("请上传后缀名为mp4的附件！");
          return false;
        }
      }else{
        if (["jpg", "png"].indexOf(FileExt.toLowerCase()) === -1) {
          this.$Message.error("请上传后缀名为jpg、png的附件！");
          return false;
        }
      }
    },
    dianji(index) {
      if (index == 4) {
        this.imgTitle = "封面视频";
        this.articleType = 2;
        this.isImg = false;
      } else {
        this.imgTitle = "文章封面";
        this.articleType = 1;
        this.isImg = true;
      }
    }
  }
};
</script>
<style scoped>
>>> .ivu-form-item-content {
  text-align: center !important;
  margin: 0;
}
>>> .ivu-form-item-content label {
  margin-right: 36px !important;
}
</style>