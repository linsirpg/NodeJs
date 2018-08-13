'use strict'
const Service = require('egg').Service;
const request = require('request');
class wcChartService extends Service {

  async getWxInfo (RECID) {
    // 获取微信公众号的数据
    const WxInfo = await this.ctx.app.mysql.get('wx_config', {
        "RECID": RECID
      })
    return WxInfo
  }
  // 用户授权登陆后，通过请求头的Code来进行之后的操作，获取用户信息
  async getUserInfo(wxConfig) {
    if (!wxConfig.APP_ID) {
      wxConfig = await this.getWxInfo(wxConfig)
    }
    let Code = this.ctx.req.headers.referer.split("code=")[1].split('&')[0];
    // 通过code换取网页授权access_token
    const getAccessToken = function () {
      return new Promise((resolve, reject) => {
        let prefix = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wxConfig.APP_ID}&secret=${wxConfig.APP_SECRET}&code=${Code}&grant_type=authorization_code`;
        request.get(prefix, function optionalCallback(err, httpResponse, body) {
          if (err) {
            reject('失败');
          } else {
            resolve(body);
          }
        })
      });
    }
    //拉取用户信息
    const getUserMess = function (AccessToken) {
      return new Promise((resolve, reject) => {
        let prefix = `https://api.weixin.qq.com/sns/userinfo?access_token=${JSON.parse(AccessToken).access_token}&openid=${JSON.parse(AccessToken).openid}&lang=zh_CN`;
        request.get(prefix, function optionalCallback(err, httpResponse, body) {
          if (err) {
            reject('失败');
          } else {
            resolve(body);
          }
        })
      });
    }
    let AccessToken = await getAccessToken()
    let UserInfo = await getUserMess(AccessToken)
    return UserInfo
  }
}
module.exports = wcChartService;

// 在控制器的使用方法 var UserInfo = await ctx.service.wxchart.getUserInfo(wxConfig); UserInfo 即为用户信息
// 在控制器的使用方法 var WxInfo = await ctx.service.wxchart.getWxInfo(wxConfig); UserInfo 即为用户信息

