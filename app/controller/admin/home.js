/** @format */

'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi api'
  }
  async login() {
    const userName = this.ctx.request.body.userName
    const passWord = this.ctx.request.body.passWord
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName + "' AND password = '" + passWord + "'"
    const res = await this.app.mysql.query(sql)
    if (res.length > 0) {
      const openId = new Date().getTime()
      this.ctx.session.openId = {openId}
      this.ctx.body = {data: '登录成功', openId}
    } else {
      this.ctx.body = {data: '登录失败'}
    }
  }
  async getTypesInfo() {
    const resTypes = await this.app.mysql.select('types')
    this.ctx.body = {data: resTypes}
  }
  async addArticle() {
    const tmpArticle = this.ctx.request.body
    const res = await this.app.mysql.insert('posts', tmpArticle)
    const insertSuccess = res.affectedRows === 1
    const insertId = res.insertId
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    }
  }
  async updateArticle() {
    const tmpArticle = this.ctx.request.body
    const res = await this.app.mysql.update('posts', tmpArticle)
    const updateSuccess = res.affectedRows === 1
    this.ctx.body = {
      isSuccess: updateSuccess,
    }
  }
  async getArticleList() {
    const sql =
      'SELECT posts.id as id,' +
      'posts.title as title,' +
      'posts.introduce as introduce,' +
      'DATE_FORMAT(posts.addTime,"%Y-%m-%d %H:%i:%s") as addTime,' +
      'posts.view_count as view_count,' +
      'types.typeName as typeName ' +
      'FROM posts LEFT JOIN types ON posts.type_id=types.id ' +
      'ORDER BY posts.id DESC'
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {data: res}
  }
  async delArticle() {
    const id = this.ctx.params.id
    const res = await this.app.mysql.delete('posts', {id})
    this.ctx.body = {data: res}
  }
  async getArticleById() {
    const id = this.ctx.params.id
    const sql =
      'SELECT posts.id as id,' +
      'posts.title as title,' +
      'posts.introduce as introduce,' +
      'DATE_FORMAT(posts.addTime,"%Y-%m-%d") as addTime,' +
      'posts.view_count as view_count,' +
      'posts.article_content as article_content,' +
      'types.typeName as typeName,' +
      'types.id as typeId ' +
      'FROM posts LEFT JOIN types ON posts.type_id=types.id ' +
      'WHERE posts.id =' +
      id
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {data: res}
  }
}

module.exports = HomeController
