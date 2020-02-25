<!--
 * @Description: 文件页面
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-09 16:48:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-26 16:29:44
 -->
<template>
  <div class="article">
    <Button
      icon="ios-download-outline"
      type="primary"
      style="margin-bottom:20px"
      @click="fileModel =true"
    >上传文件</Button>
    <Table border :columns="columns12" :data="tabelList">
      <template slot-scope="{ row }">
        <strong>{{ row }}</strong>
      </template>
      <template slot-scope="{ row , index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">下载</Button>
        <Button type="error" size="small" @click="remove(index)">刪除</Button>
      </template>
    </Table>
    <Page
      :total="total"
      show-total
      show-sizer
      :current.sync="current"
      :page-size="pagesize"
      @on-change="handleCurrent"
      @on-page-size-change="handlePagesize"
    />
    <Modal v-model="fileModel" title="上传文件" :closable="false">
      <Form ref="fileValidate" :model="fileValidate" :rules="rules" :label-width="80">
        <FormItem label="文件类型" prop="fileType">
          <RadioGroup v-model="fileValidate.fileType">
            <Radio label="0">文档</Radio>
            <Radio label="1">图片</Radio>
            <Radio label="2">视频</Radio>
            <Radio label="3">其他</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="文件" prop="file">
          <Upload
            ref="uploadFile"
            :action="upFile"
            :data="fileData"
            :before-upload="beforeFileUpload"
            :on-success="handleSuccess"
          >
            <Button icon="ios-cloud-upload-outline" @click="selectFile()">上传文件</Button>
          </Upload>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="onCancel()">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import Bus from "../../util/eventBus";
import * as api from "../../api/api";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      columns12: [
        {
          title: "文件名",
          key: "fileName",
          align: "center"
        },
        {
          title: "文件类型",
          key: "fileType",
          align: "center",
          render: (h, params) =>
            h(
              "i-button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                }
              },
              this.fileType(params.row.fileType)
            )
        },
        {
          title: "文件上传者",
          key: "fileOwner",
          align: "center"
        },
        {
          title: "上传日期",
          key: "createDate",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      tabelList: [],
      total: 0,
      current: 1,
      pagesize: 10,
      id: 0,
      fileModel: false,
      fileValidate: {
        file: "",
        fileType: ""
      },
      rules: {
        fileType: [
          { required: true, message: "请选择文件类型", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.$Spin.show();
    this.getList();
  },
  computed: {
    upFile() {
      return "/api/file/upload" + this.fileValidate.file;
    },
    fileData() {
      let fileType = {
        fileType: this.fileValidate.fileType
      };
      return fileType;
    }
  },
  methods: {
    /**
     * @name: 获取文件列表
     * @msg:
     * @param {type}
     * @return:
     */
    getList() {
      this.tabelList = [];
      var size = this.pagesize;
      var page = this.current;
      this.$get(api.getFiles + "/" + this.id + "/" + size + "/" + page).then(
        res => {
          if (res.code == 20001) {
            this.tabelList = res.data.rows;
            this.total = res.data.total;
            setTimeout(() => {
              this.$Spin.hide();
            }, 500);
          }
        }
      );
    },
    /**
     * @name: 下载文件
     * @msg:
     * @param {type}
     * @return:
     */
    show(index) {
      this.$Spin.show();
      var fileId = this.tabelList[index].fileId;
      axios({
        method: "get", // 请求方式
        url: api.downloadFile + "?fileId=" + fileId, // 请求地址
        responseType: "blob" // 返回数据类型
      })
        .then(res => {
          var filename = this.tabelList[index].fileName;
          var blob = new Blob([res.data]);
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, filename);
          } else {
            var a = document.createElement("a");
            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.click();
            this.$Message.success("下载成功");
            this.$Spin.hide();
          }
        })
        .catch(error => {
          this.$Message.error(error.message);
        });
      /**
       * @name: 删除文件
       * @msg:
       * @param {type}
       * @return:
       */
    },
    remove(index) {
      var fileId = this.tabelList[index].fileId;
      var fileName = this.tabelList[index].fileName;
      var row = this.tabelList[index];
        this.$Modal.confirm({
          title: "删除",
          content: `<p>确定删除文件<span style="font-weight:900">${fileName}</span>吗？</p>`,
          onOk: () => {
            this.$delete(api.deleteFile + "/" + fileId)
              .then(res => {
                if (res.code == 20001) {
                  this.$Message.success(res.message);
                  this.getList();
                } else {
                  this.$Message.info(res.message);
                }
              })
              .catch(err => {
                this.$Message.error(err.message);
              });
          },
          onCancel: () => {
            this.$Message.info("取消删除");
          }
        });
    },
    handleSuccess(file) {
      if (file.code == 20001) {
        this.$Message.success(file.message);
        this.getList();
        this.$refs.uploadFile.clearFiles();
        this.$refs.fileValidate.resetFields();
        this.fileModel = false;
      }
    },
    handlePagesize(val) {
      this.pagesize = val;
      this.getList();
    },
    handleCurrent(val) {
      this.current = val;
      this.getList();
      /**
       * @name: 文件类型转换
       * @msg:
       * @param {type}
       * @return:
       */
    },
    fileType(val) {
      if (val === 0) {
        return "文档";
      } else if (val === 1) {
        return "图片";
      } else if (val === 2) {
        return "视频";
      } else if (val === 3) {
        return "其他";
      }
    },
    selectFile() {
      this.$refs.fileValidate.validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    beforeFileUpload(file) {
      var FileExt = file.name.replace(/.+\./, "");
      if (!this.fileValidate.fileType) {
        this.$Message.error("请选择文件类型");
        return false;
      } else if (this.fileValidate.fileType == 0) {
        if (
          ["doc", "docx", "xls", "ppt"].indexOf(FileExt.toLowerCase()) === -1
        ) {
          this.$Message.error("请上传后缀名为doc、docx、xls、ppt的附件！");
          return false;
        }
      } else if (this.fileValidate.fileType == 1) {
        if (["jpg", "png"].indexOf(FileExt.toLowerCase()) === -1) {
          this.$Message.error("请上传后缀名为jpg、png的附件！");
          return false;
        }
      } else if (this.fileValidate.fileType == 2) {
        if (["mp4"].indexOf(FileExt.toLowerCase()) === -1) {
          this.$Message.error("请上传后缀名为mp4的附件！");
          return false;
        }
      } else if (this.fileValidate.fileType == 3) {
        if (["zip"].indexOf(FileExt.toLowerCase()) === -1) {
          this.$Message.error("请上传后缀名为zip的附件！");
          return false;
        }
      }
      this.$Spin.show();
    },
    onCancel() {
      this.$refs.uploadFile.clearFiles();
      this.$refs.fileValidate.resetFields();
      this.fileModel = false;
    }
  }
};
</script>


