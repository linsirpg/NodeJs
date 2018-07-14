'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const wechart = app.middleware.wechart({ Id: 8 ,app});
  router.get('/',wechart, controller.home.index);
  router.get('/home', controller.home.getData);
  router.get('/getWxConfig',wechart,controller.wechart.getWxConfig);
  router.get('/UserAccredit',wechart,controller.wechart.UserAccredit);
  
};
