<!--
 * @Description: 左侧收缩导航栏
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-09 14:19:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-26 17:28:30
 -->
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark">
          <div class="layout-logo">信息工程学院</div>
          <!-- <div class="search">
            
            
          </div> -->
          <div class="layout-nav">
            <Tag type="dot">欢迎您：{{username}}</Tag>
            <Button @click="search()">文章搜索</Button>
            <Button @click="logout()">登出</Button>
            <Button @click="help = true">帮助</Button>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}" class="nav">
          <Menu
            theme="light"
            width="auto"
            :accordion="true"
            :active-name="active"
            ref="active"
            :open-names="open"
            @on-select="navigateTo"
          >
            <div v-for="(item,index) in menuList" :key="index">
              <Submenu :name="item.name" v-if="item.submenu">
                <template slot="title">
                  <!-- <Icon :type="item.icon"></Icon> -->
                  <span>{{item.name}}</span>
                </template>
                <MenuItem :name="item.name" v-for="(item,index) in item.submenu" :key="index">
                  <span @click="toIndex(item)">{{item.name}}</span>
                </MenuItem>
              </Submenu>
              <MenuItem :name="item.name" v-else>
                <!-- <Icon :type="item.icon"></Icon> -->
                <span @click="toIndex(item)">{{item.name}}</span>
              </MenuItem>
            </div>
          </Menu>
        </Sider>
        <Layout>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <Tags></Tags>
            <!-- 判断是都需要缓存路由，新增文章页面不需要缓存, -->
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"  :key="$route.fullPath"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"  :key="$route.fullPath"></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <Modal v-model="help" title="帮助">
      <img src="../../../static/images/weixin.jpg" alt="微信公众号">
      <div slot="footer">
        <Button @click="ok">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import Bus from "../../util/eventBus";
import * as api from "../../api/api";
import Tags from "./tag";
export default {
  data() {
    return {
      isCollapsed: false,
      menuList: [
        {
          icon: "ios-analytics",
          name: "文章",
          id: "1",
          submenu: [
            {
              name: "党内通知",
              url: "/article0",
              id: "5"
            },
            {
              name: "党建动态",
              url: "/article1",
              id: "6"
            },
            {
              name: "必学要闻",
              url: "/article2",
              id: "7"
            },
            {
              name: "热点新闻",
              url: "/article3",
              id: "8"
            },
            {
              name: "视频",
              url: "/article4",
              id: "9"
            }
          ]
        },
        {
          icon: "ios-analytics",
          name: "问卷",
          id: "2",
          submenu: [
            {
              name: "问卷",
              id: "14",
              url: "/question",
              title: "问卷 - 信息工程学院小先锋管理系统"
            },
            {
              name: "问卷结果",
              id: "15",
              url: "/questionResult",
              title: "问卷结果 - 信息工程学院小先锋管理系统"
            }
          ]
        },
        {
          icon: "ios-analytics",
          name: "评论",
          url: "/comment",
          id: "3"
        },
        {
          icon: "ios-analytics",
          name: "文件",
          id: "4",
          submenu: [
            {
              name: "文档",
              id: "10",
              url: "/file0"
            },
            {
              name: "图片",
              id: "11",
              url: "/file1"
            },
            {
              name: "视频",
              id: "12",
              url: "/file2"
            },
            {
              name: "其他",
              id: "13",
              url: "/file3"
            }
          ]
        },
        {
          icon: "ios-analytics",
          name: "反馈",
          url: "/feed",
          id: "16"
        },
        {
          icon: "ios-analytics",
          name: "打卡记录",
          url: "/record",
          id: "17"
        }
      ],
      open: [],
      active: "党内通知",
      help: false,
      key:''
    };
  },
  mounted() {
    this.getOpen();
  },
  watch: {
    $route(newValue, oldValue) {
      this.active = newValue.meta.title;
      this.getOpen();
    }
  },
  computed: {
    username() {
      get: {
        return localStorage.getItem("username");
      }
    }
  },
  components: {
    Tags
  },
  methods: {
    /**
     * @name: 点击菜单进行路由切换
     * @msg:
     * @param {type}
     * @return:
     */
    toIndex(menu) {
      var Url = menu.url;
      // replace(/-/g, '') //去掉"-"号
      if (this.$route.name == Url.replace(/\//g, "")) return;
      document.title = menu.title + "信息工程学院小先锋管理系统";
      this.$router.push(menu.url);
      localStorage.setItem("id", menu.id);
    },
    ok() {
      this.help = false;
    },
    getOpen() {
      this.open = ["文件"];
      this.$nextTick(() => {
        this.active = this.$route.meta.title;
        var name = this.$route.name;
        if (name.indexOf("article") != -1) {
          this.open[0] = "文章";
        } else if (name.indexOf("file") != -1) {
          this.open[0] = "文件";
        } else if (name.indexOf("question") != -1) {
          this.open[0] = "问卷";
        } else if (name.indexOf("comment") != -1) {
          this.open[0] = "评论";
        } else if (name.indexOf("feed") != -1) {
          this.open[0] = "反馈";
        } else {
          this.open[0] = "";
        }
        this.$refs.active.updateActiveName();
        this.$refs.active.updateOpened();
      });
    },
    logout() {
      this.$post(api.logout).then(res => {
        this.$Message.success("登出成功");
        // this.$cookies.remove("token");
        this.$router.push("/login");
      });
    },
    // instance() {
    //   const title = "帮助";
    //   const content = `<img src='../../../static/images/weixin.jpg'>`;
    //   this.$Modal.info({
    //     title: title,
    //     content: content
    //   });
    // },
    navigateTo(name) {
      // console.log(name)
    },
    search(){
      this.$router.push("/search");
      
    }
  }
};
</script>