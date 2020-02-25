<!--
 * @Description: 
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-17 00:14:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-26 22:37:38
 -->
<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;"></div>
  </div>
</template>
<script>
import E from "wangeditor";
import * as api from "../../api/api";
import axios from "axios";
import qs from "qs";
export default {
  name: "editorElem",
  data() {
    return {
      editor: null,
      file: "",
      imgUrl: "",
    };
  },
  props: ['editorContent','content'],    // 接收父组件的方法
  watch: {
    // 当父组件内容发生改变后改变编辑器的内容
    content () {
      this.editor.txt.html(this.content)
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    this.editor.customConfig.onchange = (html) => {
      this.$emit('update:editorContent',html)
    };
    this.editor.customConfig.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      // "emoticon", // 表情
      "image", // 插入图片
      "table" // 表格
      // "code", // 插入代码
      // "undo", // 撤销
      // "redo" // 重复
    ];
    // 自定义错误提示
    this.editor.customConfig.customAlert = (info) =>{
      // info 是需要提示的内容
      this.$Message.info(info);
    };
    this.editor.customConfig.linkImgCallback = (url)=> {
      this.$Message.message("插入网络图片成功");
    };
    this.editor.customConfig.customUploadImg = (files, insert) => {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      this.file = files[0];
      var form = new FormData(); // FormData 对象
      form.append("file", files[0]); // 文件对象
      form.append("fileType", 1); // 文件对象
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
          //之前说的以表单传数据的格式来传递fromdata
        }
      };
      this.$post(api.uploadFile, form, config).then(res => {
        this.$Message.success(res.message);
        this.imgUrl ="/api" + res.data;
        // 上传代码返回结果之后，将图片插入到编辑器中
        insert(this.imgUrl);
      });
    };

    this.editor.create(); // 创建富文本实例
    // 如果父组件中的富文本内容为空则赋值
    if (!this.content) {
      this.editor.txt.html('请编辑文章内容')
    }
  }
};
</script>
