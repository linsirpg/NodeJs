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
  router.get('/test',controller.miniProgram.test);

  // 商城首页
  router.post('/api/Advert/LoadAdvertList', controller.gdtvshop.getHomeAdverData);
  router.post('/api/Advert/LoadAdvertPoistion', controller.gdtvshop.getLoadAdvertPoistion);
  router.post('/api/Product/LoadProductByCate', controller.gdtvshop.getLoadProductByCate);
  router.post('/api/Product/LoadCateGroup', controller.gdtvshop.LoadCateGroup);
  router.post('/api/Product/LoadCateGroup', controller.gdtvshop.LoadCateGroup);
  


  // 专场
  router.post('/api/Activity/GetSpecialActivity', controller.getspecialactivity.getspecialactivity);
  router.post('/api/Product/GetReferenceProductList', controller.getspecialactivity.GetReferenceProductList);

  
};


