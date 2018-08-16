'use strict';

module.exports = appInfo => {
  const config = exports = {
    mysql: {
      // database configuration
      client: {
        // host
        host: 'localhost',
        // port
        port: '3306',
        // username
        user: 'root',
        // password
        password: '123456',
        // database
        database: 'gdtv_cms',
      },
      // load into app, default is open
      app: true,
      // load into agent, default is close
      agent: false,
    }
  };
  config.security = {
    csrf: {
      enable: false,
      // ignoreJSON: false, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
    // domainWhiteList: [ 'http://localhost:8080' ],
  };
  // config.cors = {
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  //   credentials: true
  // };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1526951829703_8487';
  // add your config here
  // config.middleware = ['wechart'];
  // config.wechart = {
  //   Id:8,
  //   app:appInfo
  // }
  return config;
};
