'use strtic'

const Controller = require('egg').Controller;

class gdtvshopController extends Controller {

    async getHomeAdverData(ctx) {
        let adverData = await ctx.service.gdtvshop.getAdverData(ctx.request.body);
        this.ctx.body = adverData;
    }
}
module.exports = gdtvshopController;