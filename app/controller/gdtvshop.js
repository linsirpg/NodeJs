'use strtic'

const Controller = require('egg').Controller;

class gdtvshopController extends Controller {

    async getHomeAdverData(ctx) {
        let adverData = await ctx.service.gdtvshop.getAdverData(ctx.request.body);
        this.ctx.body = adverData;
    }

    async getLoadProductByCate(ctx) {
        let ProductByCateData = await ctx.service.gdtvshop.getLoadProductByCate(ctx.request.body);
        this.ctx.body = ProductByCateData;
    }    
    async LoadCateGroup(ctx) {
        let ProductList = await ctx.service.gdtvshop.LoadCateGroup(ctx.request.body)
        this.ctx.body = ProductList
    }
    async getLoadAdvertPoistion(ctx) {
        let ProductList = await ctx.service.gdtvshop.getLoadAdvertPoistion(ctx.request.url.split('?')[1].split('=')[1])
        this.ctx.body = ProductList 
        // this.ctx.body = '1212'
    }
}
module.exports = gdtvshopController;