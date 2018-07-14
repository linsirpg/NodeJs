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

