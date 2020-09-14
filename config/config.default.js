/**
 * /* eslint valid-jsdoc: "off"
 *
 * @format
 */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1594959246014_9998'

  // add your middleware config here
  config.middleware = []

  // config.adminauth = {
  //   enable: true, // 是否开启该中间件，不写默认开启
  //   match: ['/admin/getTypesInfo'], // 只匹配指定路由，反之如果只忽略指定路由，可以用ignore
  //   // ignore: ['/'] // 不要与match一起使用，避免冲突
  // }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  exports.mysql = {
    // database configuration
    client: {
      // host
      host: 'mysql',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '123456',
      // database
      database: 'blogs',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  }

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [
      'http://47.105.40.202:3000',
      'http://47.105.40.202:3001',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
    ],
  }

  config.cors = {
    // origin: 'http://localhost:3000',
    credentials: true, // 允许Cook可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }

  /**
   * 配置session
   * session的配置和cookie基本是一样的,可以使用cookie里面的配置
   */
  config.session = {
    key: 'SESSION_ID', // 设置session cookie里面的key
    maxAge: 1000 * 60 * 30, // 设置过期时间
    httpOnly: true,
    renew: true, // renew等于true 那么每次刷新页面的时候 session都会被延期
  }

  return {
    ...config,
    ...userConfig,
  }
}
