/** @format */
'use strict'
module.exports = app => {
  const {router, controller} = app
  const adminauth = app.middleware.adminauth()
  router.get('/admin/index', controller.admin.home.index)
  router.post('/admin/login', controller.admin.home.login)
  router.get('/admin/getTypesInfo', adminauth, controller.admin.home.getTypesInfo)
  router.post('/admin/addArticle', adminauth, controller.admin.home.addArticle)
  router.post('/admin/updateArticle', adminauth, controller.admin.home.updateArticle)
  router.get('/admin/getArticleList', adminauth, controller.admin.home.getArticleList)
  router.get('/admin/delArticle/:id', adminauth, controller.admin.home.delArticle)
  router.get('/admin/getArticleById/:id', adminauth, controller.admin.home.getArticleById)
}
