'use strtic'

const Service = require('egg').Service;

class gdtvshopService extends Service {

    async getAdverData(ctx) {
        console.log(ctx,123)
        const AdverData = await this.ctx.app.mysql.select('cms_advert_info', {
            // where: { 'ADVERT_CODE': ctx.AdvertCode },
            where: { 'ADVERT_CODE': ctx.AdvertCode },
        })
        return AdverData;
    }
}
module.exports = gdtvshopService;