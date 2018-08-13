'use strict';
const Controller = require('egg').Controller;
const request = require('request');

// 在控制器的使用方法 var UserInfo = await ctx.service.wxchart.getUserInfo(wxConfig); UserInfo 即为用户信息

class WxConfigController extends Controller {
    async getWxConfig(ctx) {
        let Code = ctx.req.headers.referer.split("code=")[1].split('&')[0];
        var WxConfigUrl = '';
        if (ctx.req.headers.referer.split('#')[0]) {
            WxConfigUrl = ctx.req.headers.referer.split('#')[0]
        } else {
            WxConfigUrl = ctx.req.headers.referer
        }
        
        let wxConfig = await ctx.service.wxchart.getWxInfo(8);

        let ret = {};

        // var UserInfo = await ctx.service.wxchart.getUserInfo(wxConfig);
        
        var createNonceStr = function () {
            return Math.random().toString(36).substr(2, 15);
        };
        var createTimestamp = function () {
            return parseInt(new Date().getTime() / 1000) + '';
        };
        var raw = function (args) {
            var keys = Object.keys(args);
            keys = keys.sort()
            var newArgs = {};
            keys.forEach(function (key) {
                newArgs[key.toLowerCase()] = args[key];
            });
            var string = '';
            for (var k in newArgs) {
                string += '&' + k + '=' + newArgs[k];
            }
            string = string.substr(1);
            return string;
        };
        var sign = function (jsapi_ticket, url) {
            ret = {
                jsapi_ticket: jsapi_ticket,
                nonceStr: createNonceStr(),
                timestamp: createTimestamp(),
                url: url
            };
            var string = raw(ret);
            var sha1 = require("sha1")
            return sha1(string);
        };
        var mySignature = sign(wxConfig.JS_TICKET_VALUE, WxConfigUrl)
        var obj = {}
        obj.debug = false;
        obj.timestamp = ret.timestamp;
        obj.nonceStr = ret.nonceStr;
        obj.appId = wxConfig.APP_ID;
        obj.signature = mySignature;
        obj.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'translateVoice', "getNetworkType", 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'];
        return ctx.body = obj
    }
    // 用户授权登录
    async UserAccredit(ctx) {
        let wxConfig = await ctx.service.wxchart.getWxInfo(8);
        let APPID = wxConfig.APP_ID;
        let REDIRECT_URI = encodeURIComponent(ctx.query.Url);
        let scope = ctx.query.ScopeStatus ? 'snsapi_base' : 'snsapi_userinfo';
        let STATE = '';
        var OpenUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}&state=${STATE}#wechat_redirect`
        return ctx.body = OpenUrl
    }
}
module.exports = WxConfigController;
