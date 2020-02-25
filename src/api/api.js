/*
 * @Description: api接口文档
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-08 18:54:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-26 16:36:35
 */

export const CONTEXT = '/api'

// =============================用户 api=============================
/**
 * @name: 管理员登录 post    (已完成)
 * @msg: 
 * @param {type} 
 * account:账户或工号
   password：密码
 * @return: 
 */
export const Login = CONTEXT + '/admin/login'
/**
 * @name: 管理员注册 post  (是否需要提供注册，还是后台分配)
 * @msg: 
 * @param {type} 
 * account:账户或工号
   password：密码
  （可选）job：职位
  （可选）department:部门
 * @return: 
 */
export const regist = CONTEXT +  '/admin/regist'
/**
 * @name: 登出 post   (已完成)
 * @msg: 直接请求就行，啥都不用传
 * @param {type} 
 * @return: 
 */
export const logout = CONTEXT + '/logout'
/**
 * @name: 密码修改 post  (管理员密码是否需要修改)
 * @msg: 首先需要登录状态，再进行接口请求，流程要搞清楚
 * @param {type} 
 * oldPassword：旧密码
  newPassword：新密码
  repeatPassword：确认新密码
 * @return: 
 */
export const changePassword =CONTEXT +  '/changePassword'




// =============================文章 api=============================
/**
 * @name: 搜索文章 post  (管理员是否需要搜索文章)
 * @msg: 上全文搜索框架
 * @param {type} 
 * 
  key	12
  page	1
  size	3
 * @return: 
 */
export const searchArticle =CONTEXT +  '/searchArticle'
/**
 * @name: 首页文章删除 del 
 * @msg: 
 * @param {type} 
 * articleId:分页获取文章的时候可以获取到它的id
 * @return: 
 */
// 
export const deleteArticle =CONTEXT +  '/deleteArticle'
/**
 * @name: 新增文章 post  
 * @msg: 
 * @param {type} 
 * title:文章标题
   content：文章内容，前端看能不能整合富文本
  （可选）label：文章标签，数据库设计时有的，感觉有点用，但似乎用处不大
   type:文章类型 0:党内通知 1:党建动态 2:必学要闻 3:热点新闻 4:视频
 * @return: 
 */
// 
export const addArticle =CONTEXT +  '/addArticle'
/**
 * @name: 修改文章 post   
 * @msg: 
 * @param {type} 
 * articleId:分页获取文章的时候可以获取到它的id
   author：分页获取文章的时候可以获取
   title:文章标题
   content：文章内容，前端看能不能整合富文本
  （可选）label：文章标签，数据库设计时有的，感觉有点用，但似乎用处不大
   type:文章类型 0:党内通知 1:党建动态 2:必学要闻 3:热点新闻 4:视频
 * @return: 
 */
export const updateArticle =CONTEXT +  '/updateArticle'
/**
 * @name: 查看文章 get  
 * @msg: 分页获取文章信息，未进行登陆状态验证
 * @param {type} 
 * /article/{type}/{size}/{page}
  type：按文章类型获取 0:党内通知 1:党建动态 2:必学要闻 3:热点新闻 4:视频
  size:一页多少篇文章
  page:第几页，从第一页开始
 * @return: 
 */
export const getArticle =CONTEXT +  '/article'




// =============================文件 api=============================
/**
 * @name: 文件获取 get  
 * @msg: 
 * @param {type} 
 * /file/{fileType}/{size}/{page}
    fileType:文件类型-->0:文档 1:图片 2:视频 3:其他
    size:一页多少份文件
    page:第几页，从第一页开始
 * @return: 
 */
export const getFiles =CONTEXT +  '/file'
/**
 * @name: 文件下载 get  
 * @msg: 这个接口不像资源获取接口有BUG，可以直接下载文件同时也可放入标签内进行显示
 * @param {type} /file/download?fileId=1298180356440098
 * @return: 
 */
export const downloadFile =CONTEXT +  'file/download'
/**
 * @name: 文件删除
 * @msg: 通过fileId删除，这个参数在获取文章列表的时候会返回（删除时不会删除实际文件，依旧会存在硬盘中做备份，仅仅删除fileId与文件实体之间的联系，注意理解）
 * @param {type} 传入fileId即可
 * @return: 
 */
export const deleteFile =CONTEXT +  'file/delete'
/**
 * @name: 文件上传  
 * @msg: 
 * @param {type} 
 * file:一个multipart类型的文件
    fileType：文件类型，通过前端传过来，由用户进行分类，前端进行格式判断(或者用户进行选择)
    0:文档 1:图片 2:视频 3:其他
 * @return: 
 */
export const uploadFile =CONTEXT +  'file/upload'


// =============================问卷 api=============================
/**
 * @name: 问卷显示 get  
 * @msg: 
 * @param {type} /questionnaire/{size}/{page}
 * @return: 
 */
export const getQuestionnaire =CONTEXT +  '/questionnaire'

/**
 * @name: 添加问卷 post  
 * @msg: 
 * @param {type} 
  url	: www.oschina.net/question/1985083_2162098
  title: 测试
 * @return: 
 */
export const addQuestionnaire =CONTEXT +  '/addQuestionnaire'

/**
 * @name: 查询问卷回答记录 get 
 * @msg: 
 * 该接口同时返回问卷以及问卷是否完成的状态
   用户端和管理员使用的是同一个接口，但是后台会进行权限判断，从而返回不同的数据
   如果status字段返回值为0，则显示为未审核
   如果status字段返回值为1，则显示为已审核
   如果为未审核，那么管理端提供按钮进行审核，图片由url渲染出来
 * @param {type} /questionnaireRecords/${size}/${page}
 * @return: 
 */
export const getQuestionnaireRecords =CONTEXT +  '/questionnaireRecords'


/**
 * @name: 问卷回答管理员审核 get 
 * @msg: 
 * 通过查询问卷回答记录，会返回status的状态，
 *  0为未审核，1为审核通过
    0就给个审核接口，看前端如何安排
 * @param {type} 
   /passTheRecord?questionnaireRecordId=1298343242235938
 * @return: 
 */

 export const passTheRecord =CONTEXT +  "/passTheRecord"
// =============================反馈 api=============================

/**
 * @name: 查看反馈 get  
 * @msg: 
 * @param {type} 
 * /showFeedback/{page}}/{size}
 * @return: 
 * name：用户姓名
  title：反馈标题
  content：反馈内容
  contact：联系方式
 */
export const showFeedback =CONTEXT +  '/showFeedback'
// =============================用户操作相关 api=============================
/**
 * @name: 获取用户学习记录 get
 * @msg: 不显示未完任务
 * @param {type} 
 * /studyRecord/{size}/{page}
 * @return: 
 */
export const studyRecord =CONTEXT +  '/studyRecord'

/**
 * @name: 获取打卡记录（管理员） get 
 * @msg: 
 *  和用户端共用一个接口，会有权限验证
 * @param {type} 
 * /getPunchInRecord/{size}/{page}
 * @return: 
 * "userId": 用户id "punchInTime": 打卡时间 "userName": 用户详细信息中的姓名
 */
export const getPunchInRecord =CONTEXT +  '/getPunchInRecord'

// =============================评论 api=============================

/**
 * @name: 获取评论（所有文章，管理员用） get 
 * @msg: 
 * @param {type} /getAllComment/{size}/{page}
 * @return: 
 */
export const getAllComment = CONTEXT + "/getAllComment"

/**
 * @name: 删除评论（管理员用） delete  
 * @msg: /deleteComment?commentId=1298460399632418
 * @param {type} commentId
 * @return: 
 */
export const deleteComment =CONTEXT +  "/deleteComment"