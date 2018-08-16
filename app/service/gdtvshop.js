// 'use strtic'

// const Service = require('egg').Service;

// class gdtvshopService extends Service {

//     async getAdverData(ctx) {
//         let ResultObj = {
//             "ErrorCode": 0,
//             "ErrorMessage": "ok",
//             "Data": []
//         }
//         var AdverData = []
//         AdverData =  await this.app.mysql.query(
//             'select * from `cms_advert_info` where ADVERT_CODE =  "'+ ctx.AdvertCode  +'" and STATUS = 1 and (Date(START_TIME) <= now() and DATE(END_TIME) >= now() or START_TIME is null or END_TIME is null) order by SORT asc limit '+ ctx.PageSize +'  offset  '+ ctx.PageSize * (ctx.PageIndex - 1)
//         )        
//         if (ctx.Kind === 'PRODUCT') {
//             for (var j = 0; j < AdverData.length; j++) {
//                 var ProductMess = await this.ctx.app.mysql.get('cms_product_info', {
//                     'PRODUCT_NO': AdverData[j].PRODUCT_NO,
//                 })
//                 AdverData[j].TITLE =  AdverData[j].TITLE? AdverData[j].TITLE : ProductMess.PRODUCT_NAME
//                 AdverData[j].IMAGE_URL =  AdverData[j].IMAGE_URL? AdverData[j].IMAGE_URL : ProductMess.PRODUCT_IMAGE
//                 AdverData[j].DESCRIBE =  AdverData[j].DESCRIBE? AdverData[j].DESCRIBE : ProductMess.SHORT_DESC
//                 AdverData[j].PARAM1 =  AdverData[j].PARAM1? AdverData[j].PARAM1 : ProductMess.SALE_PRICE
//                 AdverData[j].PARAM2 =  AdverData[j].PARAM1? AdverData[j].PARAM2 : ProductMess.MARKET_PRICE
//                 AdverData[j].PARAM3 =  AdverData[j].PARAM1? AdverData[j].PARAM3 : ProductMess.SALE_COUNT
//             }
//         }
//         AdverData.map(function (item) {
//             var obj = {}
//             for (var attr in item) {
//                 var attrname = attr.substring(0, 1).toUpperCase() + attr.substring(1).toLowerCase();
//                 if (attrname.split('_')[1]) {
//                     attrname = attrname.split('_')[0] + attrname.split('_')[1].substring(0, 1).toUpperCase() + attrname.split('_')[1].substring(1).toLowerCase();
//                 }
//                 if (attrname === 'Recid') {
//                     attrname = 'Id'
//                 }
//                 obj[attrname] = item[attr]
//             }
//             ResultObj.Data.push(obj)
//         })
//         return ResultObj;
//     }
//     async getLoadProductByCate(ctx) {
//         console.log(ctx)
//         let ResultObj = {
//             "ErrorCode": 0,
//             "ErrorMessage": "ok",
//             "Data": []
//         }        
//         var LoadProductByCateData =  await this.app.mysql.query(
//             'select * from `shop_product_info` where TYPE_PREFIX like "%' +ctx.TypeId + '%" and status = 1 limit '+ ctx.PageSize +'  offset  '+ ctx.PageSize * (ctx.PageIndex - 1)
//         )
//         LoadProductByCateData.map(function (item) {
//             var obj = {}
//             for (var attr in item) {
//                 var attrname = attr.substring(0, 1).toUpperCase() + attr.substring(1).toLowerCase();
//                 if (attrname.split('_')[1]) {
//                     attrname = attrname.split('_')[0] + attrname.split('_')[1].substring(0, 1).toUpperCase() + attrname.split('_')[1].substring(1).toLowerCase();
//                 }
//                 if (attrname === 'Recid') {
//                     attrname = 'Id'
//                 }
//                 obj[attrname] = item[attr]
//             }
//             ResultObj.Data.push(obj)
//         })        
//         console.log(LoadProductByCateData.length, 123)
//         ResultObj.Data = LoadProductByCateData
//         return ResultObj;
//     }
// }
// module.exports = gdtvshopService;





'use strtic'

const Service = require('egg').Service;

class gdtvshopService extends Service {

    async getAdverData(ctx) {
        let ResultObj = {
            "ErrorCode": 0,
            "ErrorMessage": "ok",
            "Data": []
        }
        var AdverData = []
        AdverData =  await this.app.mysql.query(
            'select * from `cms_advert_info` where ADVERT_CODE =  "'+ ctx.AdvertCode  +'" and STATUS = 1 and (Date(START_TIME) <= now() and DATE(END_TIME) >= now() or START_TIME is null or END_TIME is null) order by SORT asc limit '+ ctx.PageSize +'  offset  '+ ctx.PageSize * (ctx.PageIndex - 1)
        )        
        if (ctx.Kind === 'PRODUCT') {
            for (var j = 0; j < AdverData.length; j++) {
                var ProductMess = await this.ctx.app.mysql.get('cms_product_info', {
                    'PRODUCT_NO': AdverData[j].PRODUCT_NO,
                })
                AdverData[j].TITLE =  AdverData[j].TITLE? AdverData[j].TITLE : ProductMess.PRODUCT_NAME
                AdverData[j].IMAGE_URL =  AdverData[j].IMAGE_URL? AdverData[j].IMAGE_URL : ProductMess.PRODUCT_IMAGE
                AdverData[j].DESCRIBE =  AdverData[j].DESCRIBE? AdverData[j].DESCRIBE : ProductMess.SHORT_DESC
                AdverData[j].PARAM1 =  AdverData[j].PARAM1? AdverData[j].PARAM1 : ProductMess.SALE_PRICE
                AdverData[j].PARAM2 =  AdverData[j].PARAM1? AdverData[j].PARAM2 : ProductMess.MARKET_PRICE
                AdverData[j].PARAM3 =  AdverData[j].PARAM1? AdverData[j].PARAM3 : ProductMess.SALE_COUNT
            }
        }
        AdverData.map(function (item) {
            var obj = {}
            for (var attr in item) {
                var attrname = attr.substring(0, 1).toUpperCase() + attr.substring(1).toLowerCase();
                if (attrname.split('_')[1]) {
                    attrname = attrname.split('_')[0] + attrname.split('_')[1].substring(0, 1).toUpperCase() + attrname.split('_')[1].substring(1).toLowerCase();
                }
                if (attrname === 'Recid') {
                    attrname = 'Id'
                }
                obj[attrname] = item[attr]
            }
            ResultObj.Data.push(obj)
        })
        return ResultObj;
    }


    
    async getLoadProductByCate(ctx) {
        console.log(ctx)
        let ResultObj = {
            "ErrorCode": 0,
            "ErrorMessage": "ok",
            "Data": []
        }        
        var LoadProductByCateData =  await this.app.mysql.query(
            'select * from `shop_product_info` where TYPE_PREFIX like "%' +ctx.TypeId + '%" and status = 1 limit '+ ctx.PageSize +'  offset  '+ ctx.PageSize * (ctx.PageIndex - 1)
        )
        LoadProductByCateData.map(function (item) {
            var obj = {
                "ProductNo":'',
                "ProductName":'',
                "ShortDesc":'',
                "ProductImage":'',
                "Url":'',
                "SaleCount":'',
                "SalePrice":'',
                "MarketPrice":'',
                "Status":'',
            }   
            var obj = {}
                obj.ProductNo = item.PRODUCT_NO;
                obj.ProductName = item.PRODUCT_NAME;
                obj.ShortDesc = item.PRODUCT_NAME;
                obj.ProductImage = item.THUMBNAIL_IMG;
                obj.Url = "https://gdtvshop.weixinmvp.com/wap/shop/productdetail.aspx?no=" + item.PRODUCT_NO;
                obj.SaleCount =  item.SELL_COUNT
                obj.SalePrice = item.SALE_PRICE
                obj.MarketPrice = item.MARKET_PRICE;
                obj.Status =  + item.STATUS;
            console.log(obj)
            ResultObj.Data.push(obj)
        })        
        return ResultObj;
    }
}
module.exports = gdtvshopService;