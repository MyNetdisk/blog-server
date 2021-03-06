/** @format */

'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api hi'
  }
  // 首页接口
  async getArticleList() {
    const sql =
      'SELECT posts.id as id,' +
      'posts.title as title,' +
      'posts.introduce as introduce,' +
      'DATE_FORMAT(posts.addTime,"%Y-%m-%d %H:%i:%s") as addTime,' +
      'DATE_FORMAT(posts.update_date,"%Y-%m-%d %H:%i:%s") as update_date,' +
      'posts.view_count as view_count,' +
      'posts.cover_image as cover_image,' +
      'posts.label as label,' +
      'types.typeName as typeName ' +
      'FROM posts LEFT JOIN types ON posts.type_id=types.id'
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {data: res}
  }
  // 详情页接口
  async getArticleById() {
    const id = this.ctx.params.id
    const sql =
      'SELECT posts.id as id,' +
      'posts.title as title,' +
      'posts.introduce as introduce,' +
      'posts.article_content as article_content,' +
      'DATE_FORMAT(posts.addTime,"%Y-%m-%d %H:%i:%s") as addTime,' +
      'DATE_FORMAT(posts.update_date,"%Y-%m-%d %H:%i:%s") as update_date,' +
      'posts.view_count as view_count,' +
      'posts.label as label,' +
      'types.typeName as typeName ' +
      'FROM posts LEFT JOIN types ON posts.type_id=types.id ' +
      'WHERE posts.id=' +
      id
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {data: res}
  }
  // 得到类别名称和编号
  async getTypeInfo() {
    const res = await this.app.mysql.select('types')
    this.ctx.body = {data: res}
  }
  // 得到格言phrase
  async getPhrase() {
    const res = await this.app.mysql.select('phrase', {
      columns: ['hitokoto'],
    })
    this.ctx.body = {data: res}
  }
  // 根据类型ID获得文章列表
  async getListById() {
    const id = this.ctx.params.id
    const sql =
      'SELECT posts.id as id,' +
      'posts.title as title,' +
      'posts.introduce as introduce,' +
      'DATE_FORMAT(posts.addTime,"%Y-%m-%d %H:%i:%s") as addTime,' +
      'posts.view_count as view_count,' +
      'types.typeName as typeName ' +
      'FROM posts LEFT JOIN types ON posts.type_id=types.id ' +
      'WHERE type_id=' +
      id
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {data: res}
  }
  // 根据文章日期升序查询文章
  async getTimeline() {
    const sql =
      'SELECT posts.id as id,' +
      'posts.title as title,' +
      'DATE_FORMAT(posts.addTime,"%Y-%m-%d") as addTime ' +
      'FROM posts order by addTime desc'
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {data: res}
  }
  // 获取网站信息
  async getSiteinfo() {
    const res = await this.app.mysql.select('siteinfo')
    this.ctx.body = {data: res}
  }
  // 获取标签
  async getTags() {
    const res = await this.app.mysql.select('label', {
      columns: ['id', 'name', 'out_color'],
    })
    this.ctx.body = {data: res}
  }
  // 获取分类
  async getCategory() {
    const sql =
      'select posts.title,posts.Id as posts_id,types.typeName,types.Id as types_id from posts left join types on posts.type_id=types.Id'
    const res = await this.app.mysql.query(sql)
    const mainCate = []
    const obj = {}
    res.reduce((prev, elem) => {
      obj[elem.types_id] ? "" : obj[elem.types_id] = true && prev.push({
        typeName:elem.typeName,
        types_id:elem.types_id
      })
      return prev
    }, []).forEach((element1)=>{
      element1["subCate"]=[]
      res.filter(function (elem) {
        return elem.types_id === element1.types_id
      })
      .forEach(element => {
        element1['subCate'].push({post_id: element.posts_id, title: element.title})
      })
      mainCate.push(element1)
    })
    this.ctx.body = {data: mainCate}
  }
  // 获取网站管理员信息
  async getAdminInfo(){
    const sql = `SELECT admin_user.Id as id,admin_user.avatar,admin_user.userName as username,admin_user.introduction,role.name FROM admin_user LEFT JOIN role ON admin_user.role=role.value WHERE admin_user.role='ROLE_ADMIN'`
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {data: res}
  }
  // 根据文章ID获得文章评论列表
  async getCommentById() {
    const id = this.ctx.params.id
    const sql = `SELECT comment.id as id,comment.content as content,comment.article_id as article_id,comment.comment_id as comment_id,comment.from_avatar as comment_avatar,comment.from_name,comment.create_date as comment_date FROM comment WHERE article_id=${id}`
    const res = await this.app.mysql.query(sql)
    const comtotal = res.length
    const mainCom = res.filter(function (elem) {
      return elem.comment_id === null
    })
    mainCom.forEach(function (element) {
      element.subCom = []
      const subComment = res.filter(function (elem) {
        return elem.comment_id != null && element.id === elem.comment_id
      })
      if (subComment.length !== 0) {
        subComment.forEach(function (ele) {
          element.subCom.push(ele)
        })
      }
    })
    this.ctx.body = {
      data: mainCom,
      comtotal,
    }
  }
  // 添加文章评论
  async addComment() {
    const tmpComment = this.ctx.request.body
    const res = await this.app.mysql.insert('comment', tmpComment)
    const insertSuccess = res.affectedRows === 1
    const insertId = res.insertId
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    }
  }
  // 添加是否注册接口
  async isRegister() {
    const username = this.ctx.params.username
    const sql = `SELECT username FROM user WHERE username = '${username}'`
    const res = await this.app.mysql.query(sql)
    if (res.length > 0) {
      this.ctx.body = true
    } else {
      this.ctx.body = false
    }
  }
  // 添加注册接口
  async register() {
    const tmpRegister = this.ctx.request.body
    const res = await this.app.mysql.insert('user', tmpRegister)
    const insertSuccess = res.affectedRows === 1
    const insertId = res.insertId
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    }
  }
  // 添加登录接口
  async login() {
    const tmpLogin = this.ctx.request.body
    const sql =
      " SELECT username FROM user WHERE username = '" +
      tmpLogin.username +
      "' AND password = '" +
      tmpLogin.password +
      "'"
    const res = await this.app.mysql.query(sql)
    if (res.length > 0) {
      const openId = new Date().getTime()
      this.ctx.session.openId = {openId}
      this.ctx.body = {isSuccess: true, openId}
    } else {
      this.ctx.body = {isSuccess: false}
    }
  }
}

module.exports = HomeController
