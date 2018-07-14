'use strict';
const Controller = require('egg').Controller;
const request = require('request');
class WxConfigController extends Controller {
    async getWxConfig(ctx) {
        console.log(ctx.req.headers.referer)
        let Code = ctx.req.headers.referer.split("code=")[1].split('&')[0];
        console.log(Code)
        var WxConfigUrl = '';
        if(ctx.req.headers.referer.split('#')[0]){
            WxConfigUrl = ctx.req.headers.referer.split('#')[0]
        }else{
            WxConfigUrl = ctx.req.headers.referer
        }
        let wxConfig = await this.app.mysql.get('wx_config', {
            "RECID": 8
        })
        let ret = {};
        console.log(wxConfig)
        request.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wxConfig.APP_ID}&secret=${wxConfig.APP_SECRET}&code=${Code}&grant_type=authorization_code`, function optionalCallback(err, httpResponse, body) {
            var Acc = JSON.parse(body).access_token
            var AppI = JSON.parse(body).openid
            request.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${Acc}&openid=${AppI}&lang=zh_CN`, function optionalCallback(err, httpResponse, body) {
                console.log(body)
            })
        })
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
        var mySignature = sign(wxConfig.JS_TICKET_VALUE,WxConfigUrl)
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
    async UserAccredit (ctx) {
        let wxConfig = await this.app.mysql.get('wx_config', {
            "RECID": 8
        })
        console.log(wxConfig.APP_ID);
        let APPID = wxConfig.APP_ID;;
        // let REDIRECT_URI = encodeURIComponent(ctx.req.headers.referer)
        let REDIRECT_URI = encodeURIComponent('http://test.linrains.com/public/1.html');
        let scope = true ? 'snsapi_base' : 'snsapi_userinfo';
        let STATE ='';
        console.log(ctx.req.headers.referer)
        var OpenUrl =`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}&state=${STATE}#wechat_redirect`
        return ctx.body = OpenUrl
    }
}
module.exports = WxConfigController;
