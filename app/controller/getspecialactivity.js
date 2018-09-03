'use strtic'

const Controller = require('egg').Controller;

class getSpecialactivisty extends Controller {

    async getspecialactivity (ctx) {
        let specialData = await ctx.service.getspecialactivity.getSpecialData(ctx.request.body);
        this.ctx.body = specialData
    }

    async GetReferenceProductList(ctx) {
        let ProductList = await ctx.service.getspecialactivity.GetReferenceProductList(ctx.request.body)
        this.ctx.body = ProductList
    }
}

module.exports = getSpecialactivisty
