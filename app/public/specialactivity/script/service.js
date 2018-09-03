/*
* @Author: acer
* @Date:   2017-07-07 14:18:29
* @Last Modified by:   acer
* @Last Modified time: 2017-08-02 17:05:19
*/

'use strict';


app.service('$apiService', function ($http, imgArrJsonDecode, imgArrToAdvert, advertJsonDecode, floorJsonDecode, floorArrJsonDecode, amountArrJsonDecode) {
	var self = this;

	self.Kind = undefined;

	// 配置
    self.GetSpecialActivity = function (id) {

		return $http({
			url: "/api/Activity/GetSpecialActivity",
			method: 'post',
			data:{
				"Id": id
			}
		}).then(function ($res) {

			if (!$res.data || !$res.data.Data) {
				return location = 'https://gdtvshop.weixinmvp.com/Wap/Shop/';
			}

			var Data = $res.data.Data;
			var Special = {};
			
			Special.Title = Data.TITLE;

			Special.Style = Data.PAGE_CSS || '';

			Special.Kind = Data.KIND;
			self.Kind = Special.Kind;

			Special.Thumbnail = imgArrJsonDecode(Data.THUMBNAIL_URL, []);
			Special.ThumbnailBanner = imgArrToAdvert(Special.Thumbnail);

			Special.Advert = advertJsonDecode(Data.ADVERT_CONFIG);

			Special.Recomment = floorJsonDecode(Data.RECOMMENT_CONFIG);

			Special.Navigation = floorArrJsonDecode(Data.NAVIGATION_CONFIG);

      Special.Limited = floorJsonDecode(Data.LIMITED_CONFIG);

			return Special;

		})
	};

	// 产品列表
  self.GgetReferenceProductList = function (id, CheckTime,PromotionStatus, index, size) {

		

		var PromotionTagTexts = {
			conditional_discount: '满减',
			conditional_gift: '满赠',
			discount: '直降',
			gift: '买赠',
			// shipfee: '包邮',
			coupon: '优惠券',
			// limit: '限制',
		};

		return $http({
			url: "/api/Product/GetReferenceProductList",
			method: 'post',
			data: {
				"ReferenceKind": self.Kind,
				"ReferenceCode": id,
				"PageIndex": index || 1,
        "PageSize": size || 100,
        "PromotionStatus": PromotionStatus || 1,
        "CheckTime": CheckTime || ''
			}
		}).then(function($res) {
			return $res.data.Data.map(function (Item) {
				Item.ProductBanner = imgArrToAdvert(imgArrJsonDecode(Item.ProductImage), Item.Title, Item.Url);

				Item.PromotionTagText = PromotionTagTexts[Item.PromotionTag] || '';

				return Item;
			})
		})
	};

	// 优惠卷
	self.receiveCoupon = function (ruleid, actid) {
		var src = 'https://cms.weixinmvp.com/Mass/GetCoupon.aspx?ruleid=' + ruleid + '&actid=' + actid + '&redict=' + encodeURIComponent(window.location);
		return window.location = src;
	};


});

// 解析JSON
app.factory('parseJSON', function () {
    return function (json, d) {
        try {
            return $.parseJSON(json);
        } catch (e) {
            return d;
        }
    }
});

// 解析图片路径
app.factory('imgDecode', function () {
    return function (data) {
		var Original = '';
		var Thumb = '';
		if (data) {
			var ServerUrl = (data.ServerUrl ? data.ServerUrl : '');
			Original = ServerUrl + data.FilePath;
			if(data.FileExt == 'gif'){
				Thumb = ServerUrl + data.FilePath;
			}else{
				Thumb = ServerUrl + data.FilePath + '.thumb.' + data.FileExt;
			}
		}
		return {
			Original: Original,
			Thumb: Thumb
		}
    }
});

// 解析Json图片路径
app.factory('imgArrDecode', function (imgDecode) {
    return function (arr) {
		return arr.map(function (data) {
			return imgDecode(data);
		})
    }
})

// 解析图片数组路径
app.factory('imgJsonDecode', function (parseJSON, imgDecode) {
    return function (json) {
		return imgDecode(parseJSON(json, null));
	}
});

// 解析Json图片数组路径
app.factory('imgArrJsonDecode', function (parseJSON, imgArrDecode) {
    return function (json) {
		return imgArrDecode(parseJSON(json, []));
	}
});

// 解析广告对象
app.factory('advertDecode', function (imgDecode) {
    return function (Advert) {
		if (!Advert) return null;
		Advert.Data = Advert.Data.map(function (Item) {
			return {
				Title: Item.Title,
				Url: Item.Url,
				Image: imgDecode(Item.Image),
			}
		});
		return Advert;
	}
});

// 解析Json广告对象
app.factory('advertJsonDecode', function (parseJSON, advertDecode) {
    return function (json) {
		return advertDecode(parseJSON(json, null));
	}
});

// img数组转广告
app.factory('imgArrToAdvert', function () {
    return function (arr, title, url) {
		return arr.map(function (Item) {
			return {
				Title: title || '',
				Url: url || 'javascript:;',
				Image: Item,
			}
		})
	}
});


// 解析楼层
app.factory('floorDecode', function (imgArrDecode, imgArrToAdvert, advertDecode) {
    return function (Data) {
		if (!Data) return Data;
		return {
			Title: Data.Title,
			TempId: Data.TempId,
			Code: Data.Code,
			Banner: imgArrToAdvert(imgArrDecode(Data.Image)),
			Image: imgArrDecode(Data.Image),
			Advert: advertDecode(Data.Advert),
		}
	}
});

app.factory('floorJsonDecode', function (parseJSON, floorDecode) {
    return function (json) {
		return floorDecode(parseJSON(json, null));
	}
});


app.factory('floorArrDecode', function (floorDecode) {
    return function (Arr) {
		if (!Arr) return [];
		return Arr.map(function (Item) {
			return floorDecode(Item);
		})
	}
});

app.factory('floorArrJsonDecode', function (parseJSON, floorArrDecode) {
    return function (Json) {
		return floorArrDecode(parseJSON(Json, []));
	}
});

app.factory('amountArrJsonDecode', function (parseJSON, floorArrDecode) {
  return function (Json) {
    return floorArrDecode(parseJSON(Json, []));
  }
})