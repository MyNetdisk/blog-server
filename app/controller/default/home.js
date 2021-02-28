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
      'FROM_UNIXTIME(posts.addTime,"%Y-%m-%d %H:%i:%s") as addTime,' +
      'posts.view_count as view_count,' +
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
      'FROM_UNIXTIME(posts.addTime,"%Y-%m-%d %H:%i:%s") as addTime,' +
      'posts.view_count as view_count,' +
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
  // 根据类型ID获得文章列表
  async getListById() {
    const id = this.ctx.params.id
    const sql =
      'SELECT posts.id as id,' +
      'posts.title as title,' +
      'posts.introduce as introduce,' +
      'FROM_UNIXTIME(posts.addTime,"%Y-%m-%d %H:%i:%s") as addTime,' +
      'posts.view_count as view_count,' +
      'types.typeName as typeName ' +
      'FROM posts LEFT JOIN types ON posts.type_id=types.id ' +
      'WHERE type_id=' +
      id
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {data: res}
  }
  // 根据文章ID获得文章评论列表
  async getCommentById() {
    const id = this.ctx.params.id
    const sql = `SELECT comment.id as id,comment.content as content,comment.article_id as article_id,comment.comment_id as comment_id,comment.from_avatar as comment_avatar,comment.from_name,comment.create_date as comment_date FROM comment WHERE article_id=${id}`
    const res = await this.app.mysql.query(sql)
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
    this.ctx.body = {data: mainCom}
  }
  // 添加文章评论
  // 添加文章评论
  async addComment(){
    const tmpComment = this.ctx.request.body
    const res = await this.app.mysql.insert('comment', tmpComment)
    const insertSuccess = res.affectedRows === 1
    const insertId = res.insertId
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    }
  }
}

module.exports = HomeController
