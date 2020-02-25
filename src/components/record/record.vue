<!--
 * @Description: 打卡记录页面
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-09 16:48:13
 * @LastEditors: Lianglin
 * @LastEditTime: 2019-09-03 22:23:09
 -->
<template>
  <div class="record">
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
          title: "打卡序号",
          key: "recordId",
          align: "center",
        },
        {
          title: "打卡时间",
          key: "punchInTime",
          align: "center"
        },
        {
          title: "用户姓名",
          key: "userName",
          align: "center"
        },
        {
          title: "打卡状态",
          key: "status",
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
              this.recordStatus(params.row.status)
            )
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
     * @name: 获取打卡记录列表
     * @msg:
     * @param {type}
     * @return:
     */
    getList() {
      var size = this.pagesize;
      var page = this.current;
      this.$get(api.getPunchInRecord + "/" + size + "/" + page).then(res => {
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
    recordStatus(val) {
      if (val === 1) {
        return "已完成";
      } else{
        return "未知";
      }
    }
  }
};
</script>


