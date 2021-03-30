/** @format */
'use strict'
module.exports = app => {
  const {router, controller} = app
  router.get('/default/index', controller.default.home.index)
  router.get('/default/getArticleList', controller.default.home.getArticleList)
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById)
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo)
  router.get('/default/getPhrase', controller.default.home.getPhrase)
  router.get('/default/getListById/:id', controller.default.home.getListById)
  router.get('/default/getTimeline', controller.default.home.getTimeline)
  router.get('/default/getCommentById/:id', controller.default.home.getCommentById)
  router.post('/default/addComment', controller.default.home.addComment)
  router.get('/default/isRegister/:username', controller.default.home.isRegister)
  router.post('/default/register', controller.default.home.register)
  router.post('/default/login', controller.default.home.login)
}
