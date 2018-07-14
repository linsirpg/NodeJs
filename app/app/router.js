'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const wechart = app.middleware.wechart({ Id: 1024 ,app});
  router.get('/',wechart, controller.home.index);
  router.get('/home', controller.home.getData);
};
