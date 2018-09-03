'use strtic'

const Server = require('egg').Service;

class getspecialactivity extends Server {

    async getSpecialData(ctx) {
        let ResultData = {
            ErrorCode: 0,
            ErrorMessage: 'ok',
            Data:null,
        }
          const SpecialData = await this.ctx.app.mysql.get('cms_special_activity', {
            "RECID": ctx.Id
        })
        ResultData.Data = SpecialData
        return ResultData
    }
    async GetReferenceProductList(ctx) {
        let ResultData = {
            ErrorCode: 0,
            ErrorMessage: 'ok',
            Length:0,
            Data:[]
        }
        const ProductList = await this.ctx.app.mysql.select('cms_product_ref', {
            where: {
                RELATION_CODE: ctx.ReferenceCode,
                STATUS: '1'
            }
        })
        
        for(var i = 0 ; i < ProductList.length; i ++) {
            var ProductMess = await this.ctx.app.mysql.get('cms_product_info', {
                'PRODUCT_NO': ProductList[i].PRODUCT_NO,
            })  
            ProductList.map(function (item) {
                if(item.PRODUCT_NO == ProductMess.PRODUCT_NO) {
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
                        obj.ProductNo = ProductList[i].PRODUCT_NO?ProductList[i].PRODUCT_NO:ProductMess.PRODUCT_NO;
                        obj.ProductName = ProductList[i].TITLE?ProductList[i].TITLE:ProductMess.PRODUCT_NAME;
                        obj.ShortDesc = ProductList[i].MEMO? ProductList[i].MEMO : ProductMess.SHORT_DESC;
                        obj.ProductImage = ProductList[i].IMAGE_URL?ProductList[i].IMAGE_URL:ProductMess.PRODUCT_IMAGE;
                        obj.Url = "https://gdtvshop.weixinmvp.com/wap/shop/productdetail.aspx?no=" + item.PRODUCT_NO;
                        obj.SaleCount =  ProductMess.SALE_COUNT;
                        obj.SalePrice =  ProductList[i].SALE_PRICE?ProductList[i].SALE_PRICE:ProductMess.SALE_PRICE;
                        obj.MarketPrice = ProductList[i].MARKET_PRICE?ProductList[i].MARKET_PRICE:ProductMess.MARKET_PRICE;
                        ResultData.Data.push(obj)
                }

            })                     
        }
        ResultData.Length = ResultData.Data.length;
        return ResultData
    }
}
module.exports = getspecialactivity
