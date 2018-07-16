'use strict';

const sha1 = require('sha1');

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index(ctx) {

    let wxConfig =  await ctx.service.wxchart.getWxInfo(8);

    const token = wxconfig.INTERFACE_TOKEN;

    const signature = ctx.query.signature;

    const nonce = ctx.query.nonce;

    const timestamp = ctx.query.timestamp;

    const echostr = ctx.query.echostr;

    const str = [ token, timestamp, nonce ].sort().join("");

    const sha = sha1(str);

    if (sha === signature) {

      this.ctx.body = echostr + "";

    } else {

      this.ctx.body = "wrong";

    }
  }
  async getData() {
    const post = await this.app.mysql.select('cms_special_activity');

    var params = {
      data: post,
      Code: 1,
    }

    this.ctx.body = params;

  }
}
module.exports = HomeController;
