<!--
 * @Description: 文章页面
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-09 16:48:13
 * @LastEditors: Lianglin
 * @LastEditTime: 2019-08-30 15:56:18
 -->
<template>
  <div class="article">
    <Button
      icon="ios-download-outline"
      type="primary"
      style="margin-bottom:20px"
      @click="addArticle()"
    >新增文章</Button>
    <Table border :columns="columns12" :data="tabelList">
      <template slot-scope="{ row }">
        <strong>{{ row }}</strong>
      </template>
      <template slot-scope="{ row , index }" slot="action">
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="updateArticle(index)"
        >修改</Button>
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
import qs from "qs";
export default {
  data() {
    return {
      columns12: [
        {
          title: "标题",
          key: "title",
          align: "center"
        },
        {
          title: "栏目",
          key: "type",
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
              this.articleType(params.row.type)
            )
        },
        {
          title: "作者",
          key: "author",
          align: "center"
        },
        {
          title: "日期",
          key: "updatetime",
          align: "center"
        },
        {
          title: "评论",
          key: "viewCount",
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
      id: 4
    };
  },
  created() {
    this.$Spin.show();
    this.getList();
  },
  methods: {
    getList() {
      this.tabelList = [];
      var size = this.pagesize;
      var page = this.current;
      this.$get(api.getArticle + "/" + this.id + "/" + size + "/" + page).then(
        res => {
          if (res.code == 20001) {
            this.tabelList = res.data.rows;
            this.total = res.data.total;
          }
          setTimeout(() => {
            this.$Spin.hide();
          }, 500);
        }
      );
    },
    /**
     * @name: 修改文章 post
     * @msg: updateArticle
     * @param {type} 
     * articleId:分页获取文章的时候可以获取到它的id
       author：分页获取文章的时候可以获取
      title:文章标题
      content：文章内容，前端看能不能整合富文本
      （可选）label：文章标签，数据库设计时有的，感觉有点用，但似乎用处不大
      type:文章类型 0:党内通知 1:党建动态 2:必学要闻 3:热点新闻 4:视频
    * @return: 
    */
    updateArticle(index) {
      var row = this.tabelList[index];
      var username = localStorage.getItem("username");
      this.$router.push({ name: "addArticle", params: { row, id: 2 } });
      localStorage.setItem("getArticle", JSON.stringify(row));
    },
    /**
     * @name: 新增文章 post
     * @msg:
     * @param {type}
     * @return:
     */
    addArticle() {
      this.$router.push({ name: "addArticle", params: {id: 1 }});
    },
    /**
     * @name: 删除文章
     * @msg: deleteArticle
     * @param {type} articleId
     * @return:
     */
    remove(index) {
      var articleId = this.tabelList[index].articleId;
      var row = this.tabelList[index];
        this.$Modal.confirm({
          title: "删除",
          content: `<p>确定删除文章<br>《<span style="font-weight:900">${row.title}</span>》吗？</p>`,
          onOk: () => {
            this.$post(
              api.deleteArticle,
              qs.stringify({
                articleId: articleId
              })
            )
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
    handlePagesize(val) {
      this.pagesize = val;
      this.getList();
    },
    handleCurrent(val) {
      this.current = val;
      this.getList();
    },
    /**
     * @name: 表格栏目列数据格式化
     * @msg:
     * @param {type}
     * @return:
     */
    articleType(val) {
      if (val === 0) {
        return "党内通知";
      } else if (val === 1) {
        return "党建动态";
      } else if (val === 2) {
        return "必学要闻";
      } else if (val === 3) {
        return "热点新闻";
      } else {
        return "视频";
      }
    }
  }
};
</script>

