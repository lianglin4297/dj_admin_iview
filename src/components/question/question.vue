<!--
 * @Description: 问卷页面
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-09 16:48:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-26 22:38:22
 -->
<template>
  <div class="article">
    <Button
      icon="ios-download-outline"
      type="primary"
      style="margin-bottom:20px"
      v-if="isShow"
      @click="addQuestion = true"
    >新增问卷</Button>
    <Table border :columns="isRecords ? columns12 : columns10" :data="tabelList">
      <template slot-scope="{ row }">
        <strong>{{ row }}</strong>
      </template>
      <template slot="action"></template>
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
    <Modal
      v-model="addQuestion"
      title="新增问卷"
      @on-ok="ok"
      @on-cancel="cancel"
      :loading="modalLoading"
    >
      <Form ref="question" :model="question" :rules="rules" :label-width="80">
        <FormItem label="问卷标题" prop="title">
          <Input v-model="question.title" placeholder="请输入问卷标题" />
        </FormItem>
        <FormItem label="问卷地址" prop="url">
          <Input v-model="question.url" placeholder="请输入问卷地址" />
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="imgShow" fullscreen title="问卷结果" :closable="false">
      <img :src="ImgUrl" alt="问卷结果" width="100%" height="100%" />
      <div slot="footer">
        <Button @click="onCancel()">确定</Button>
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
          title: "问卷ID",
          key: "recordId",
          align: "center"
        },
        {
          title: "问卷标题",
          key: "questionnaireTitle",
          align: "center"
        },
        {
          title: "完成日期",
          key: "finishTime",
          align: "center"
        },
        {
          title: "问卷结果",
          key: "resultImgUrl",
          align: "center",
          render: (h, params) => {
            this.ImgUrl = "/api" + params.row.resultImgUrl;
            return h("img", {
              attrs: {
                // 图片可能需要放在static文件夹下
                src:"/api" + params.row.resultImgUrl
              },
              style: {
                marginBottom: "3px"
              },
              on: {
                click: () => {
                  this.imgShow = true;
                }
              }
            });
          }
        },
        {
          title: "问卷填写人",
          key: "userName",
          align: "center"
        },
        {
          title: "审核状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            if (params.row.status == 0) {
              return h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    color: "red"
                  }
                },
                "未审核"
              );
            } else {
              return h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    color: "rgb(0, 153, 255)"
                  }
                },
                "已审核"
              );
            }
          }
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          render: (h, params) => {
            if (params.row.status == 0) {
              return h(
                "i-button",
                {
                  props: {
                    type: "primary"
                  },
                  on: {
                    click: () => {
                      // 这里通常做路由跳转，弹窗显示，发送请求等
                      this.$get(
                        api.passTheRecord +
                          "?questionnaireRecordId=" +
                          params.row.recordId
                      )
                        .then(res => {
                          this.$Message.success(res.message);
                          this.getList();
                        })
                        .catch(err => {
                          this.$Message.error(err.message);
                        });
                    }
                  }
                },
                "审核"
              );
            } else {
              return h(
                "button",
                {
                  style: {
                    display: "none"
                  }
                },
                "审核"
              );
            }
          }
        }
      ],
      columns10: [
        {
          title: "问卷ID",
          key: "qid",
          align: "center"
        },
        {
          title: "问卷标题",
          key: "title",
          align: "center"
        },
        {
          title: "添加日期",
          key: "updatetime",
          align: "center"
        },
        {
          title: "问卷地址",
          key: "url",
          align: "center"
        }
      ],
      tabelList: [],
      total: 0,
      current: 1,
      imgShow: false,
      pagesize: 10,
      isRecords: false,
      url: "questionnaire",
      isShow: true,
      addQuestion: false,
      ifStatus: "warning",
      modalLoading: true,
      ImgUrl: "",
      question: {
        title: "",
        url: ""
      },
      rules: {
        title: [
          { required: true, message: "问卷标题不能为空", trigger: "blur" }
        ],
        url: [{ required: true, message: "问卷地址不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.$Spin.show();
    this.getList();
  },
  methods: {
    /**
     * @name: 获取阅卷列表
     * @msg:
     * @param {type}
     * @return:
     */
    getList() {
      var size = this.pagesize;
      var page = this.current;
      this.$get(this.url + "/" + size + "/" + page).then(res => {
        if (res.code == 20001) {
          this.tabelList = res.data.rows;
          this.total = res.data.total;
          setTimeout(() => {
            this.$Spin.hide();
          }, 500);
        }
      });
    },
    /**
     * @name: 页码改变后刷新列表数据
     * @msg:
     * @param {type}
     * @return:
     */
    handlePagesize(val) {
      this.pagesize = val;
      this.getList();
    },
    /**
     * @name: 当前页数改变后刷新列表数据
     * @msg:
     * @param {type}
     * @return:
     */
    handleCurrent(val) {
      this.current = val;
      this.getList();
    },
    /**
     * @name: 新增问卷
     * @msg:
     * @param {type}
     * @return:
     */
    ok() {
      this.$refs.question.validate(valid => {
        this.$nextTick(() => {
          if (valid) {
            this.$post(
              api.addQuestionnaire,
              qs.stringify({
                url: this.question.url,
                title: this.question.title
              })
            )
              .then(res => {
                if (res.code == 20001) {
                  this.$Message.success(res.message);
                  this.$refs.question.resetFields();
                  this.addQuestion = false;
                  this.modalLoading = false;
                  this.getList();
                }
              })
              .catch(err => {
                this.$Message.error(err.message);
              });
          } else {
            this.modalLoading = false;
            // this.$refs.addQuestion.visible = true;
          }
        });
      });
    },
    cancel() {
      this.$Message.info("取消新增");
      this.$refs.question.resetFields();
      this.addQuestion = false;
    },
    onCancel() {
      this.imgShow = false;
    }
  }
};
</script>




