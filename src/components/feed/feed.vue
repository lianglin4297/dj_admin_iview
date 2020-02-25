<!--
 * @Description: 反馈页面
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-09 16:48:13
 * @LastEditors: Lianglin
 * @LastEditTime: 2019-08-29 22:23:00
 -->
<template>
  <div class="article">
    <Table border :columns="columns12" :data="tabelList">
      <template slot-scope="{ row }">
        <strong>{{ row }}</strong>
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
          title: "用户姓名",
          key: "name",
          align: "center"
        },
        {
          title: "反馈标题",
          key: "title",
          align: "center"
        },
        {
          title: "反馈内容",
          key: "content",
          align: "center"
        },
        {
          title: "联系方式",
          key: "contact",
          align: "center",
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
     * @name: 获取反馈列表
     * @msg:
     * @param {type}
     * @return:
     */
    getList() {
      var size = this.pagesize;
      var page = this.current;
      this.$get(api.showFeedback + "/" + page + "/" + size).then(res => {
        if (res.code == 20001) {
          this.tabelList = res.data.rows;
          this.total = res.data.total;
          setTimeout(() => {
            this.$Spin.hide();
          }, 500);
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
  }
};
</script>


