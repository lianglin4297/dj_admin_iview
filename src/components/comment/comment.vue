<!--
 * @Description: 评论页面
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-09 16:48:13
 * @LastEditors: Lianglin
 * @LastEditTime: 2019-08-26 15:56:17
 -->
<template>
  <div class="article">
    <Table border :columns="columns12" :data="tabelList">
      <template slot-scope="{ row }">
        <strong>{{ row }}</strong>
      </template>
      <template slot-scope="{ row , index }" slot="action">
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
  </div>
</template>
<script>
import Bus from "../../util/eventBus";
import * as api from "../../api/api";
import axios from "axios";
export default {
  data() {
    return {
      columns12: [
        {
          title: "文章ID",
          key: "articleId",
          align: "center"
        },
        {
          title: "评论内容",
          key: "content",
          align: "center"
        },
        {
          title: "评论人",
          key: "userName",
          align: "center"
        },
        {
          title: "评论时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              this.formatDate(
                new Date(params.row.createTime),
                "yyyy-MM-dd hh:mm"
              )
            );
          }
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
      id: 0
    };
  },
  created() {
    this.$Spin.show();
    this.getList();
  },
  methods: {
    /**
     * @name: 获取评论列表
     * @msg:
     * @param {type}
     * @return:
     */
    getList() {
      var size = this.pagesize;
      var page = this.current;
      this.$get(api.getAllComment + "/" + size + "/" + page).then(res => {
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
     * @name: 删除评论
     * @msg:
     * @param {type}
     * @return:
     */
    remove(index) {
      var commentId = this.tabelList[index].commentId;
      var row = this.tabelList[index];
      this.$Modal.confirm({
        title: "删除",
        content: `<p>确定删除评论<span style="font-weight:900">${row.content}</span>吗？</p>`,
        onOk: () => {
          this.$delete(api.deleteComment + "?commentId=" + commentId)
            .then(res => {
              if (res.code == 20001) {
                this.$Message.success(res.message);
                this.getList();
              } else {
                this.$Message.warning(res.message);
              }
            })
            .catch(err => {
              this.$Message.warning(err.message);
            });
        },
        onCancel: () => {
          this.$Message.info("取消删除");
        }
      });
    },
    handlePagesize(val) {
      this.pagesize = val;
      this.getList();
    },
    handleCurrent(val) {
      this.current = val;
      this.getList();
    },
    /**
     * @name: 格式化时间(可使用moment.js)
     * @msg:
     * @param {type}
     * @return:
     */

    formatDate(date, fmt) {
      let o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        S: date.getMilliseconds() // 毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    }
  }
};
</script>


