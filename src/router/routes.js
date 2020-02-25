/*
 * @Description: 
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-14 21:24:15
 * @LastEditors: Lianglin
 * @LastEditTime: 2019-09-03 22:10:56
 */
const routes = [{
    path: '/',
    redirect: '/article0'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/login/login'),
    meta: {
      title: '信息工程学院小先锋管理系统',
      login: false
    }
  }, {
    path: '/index',
    name: 'index',
    redirect: '/article0',
    component: () => import('../components/common/nav.vue'),
    children: [{
        path: '/article0',
        name:'article0',
        component: () => import('../components/article/article0.vue'),
        meta: {
          title: '党内通知',
          login: true,
          keepAlive: false //需要被缓存的组件
        }
      }, {
        path: '/article1',
        name:'article1',
        component: () => import('../components/article/article1.vue'),
        meta: {
          title: '党建动态',
          login: true,
          keepAlive: false //需要被缓存的组件
        }
      }, {
        path: '/article2',
        name:'article2',
        component: () => import('../components/article/article2.vue'),
        meta: {
          title: '必学要闻',
          login: true,
          keepAlive: false //需要被缓存的组件
        }
      }, {
        path: '/article3',
        name:'article3',
        component: () => import('../components/article/article3.vue'),
        meta: {
          title: '热点新闻',
          login: true,
          keepAlive: false //需要被缓存的组件
        }
      },
      {
        path: '/article4',
        name:'article4',
        component: () => import('../components/article/article4.vue'),
        meta: {
          title: '视频',
          login: true,
          keepAlive: false //需要被缓存的组件
        }
      },
      {
        path: '/addArticle',
        name:'addArticle',
        component: () => import('../components/article/addArticle.vue'),
        meta: {
          title: '新增文章',
          login: true,
          keepAlive: false //不需要被缓存的组件
        }
      },
      {
        path: '/question',
        name:'question',
        component: () => import('../components/question/question.vue'),
        meta: {
          title: '问卷',
          login: true,
          keepAlive: true //需要被缓存的组件
        }
      },
      {
        path: '/questionResult',
        name:'questionResult',
        component: () => import('../components/question/questionResult.vue'),
        meta: {
          title: '问卷结果',
          login: true,
          keepAlive: true //需要被缓存的组件
        }
      },
      {
        path: '/comment',
        name:'comment',
        component: () => import('../components/comment/comment.vue'),
        meta: {
          title: '评论',
          login: true,
          keepAlive: true //需要被缓存的组件
        }
      },
      {
        path: '/file0',
        name:'file0',
        component: () => import('../components/file/file0.vue'),
        meta: {
          title: '文档',
          login: true,
          keepAlive: true //需要被缓存的组件
        }
      }, {
        path: '/file1',
        name:'file1',
        component: () => import('../components/file/file1.vue'),
        meta: {
          title: '图片',
          login: true,
          keepAlive: true //需要被缓存的组件
        }
      }, {
        path: '/file2',
        name:'file2',
        component: () => import('../components/file/file2.vue'),
        meta: {
          title: '视频',
          login: true,
          keepAlive: true //需要被缓存的组件
        }
      }, {
        path: '/file3',
        name:'file3',
        component: () => import('../components/file/file3.vue'),
        meta: {
          title: '其他',
          login: true,
          keepAlive: true //需要被缓存的组件
        }
      },
      {
        path: '/feed',
        name:'feed',
        component: () => import('../components/feed/feed.vue'),
        meta: {
          title: '反馈',
          login: true,
          keepAlive: true //需要被缓存的组件
        }
      },
      {
        path: '/search',
        name:'search',
        component: () => import('../components/common/search.vue'),
        meta: {
          title: '文章搜索',
          login: true,
          keepAlive: false //需要被缓存的组件
        }
      },
      {
        path: '/record',
        name:'record',
        component: () => import('../components/record/record.vue'),
        meta: {
          title: '打卡记录',
          login: true,
          keepAlive: true //需要被缓存的组件
        }
      }
    ]
  }
]

export default routes
