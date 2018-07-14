const request = require('request');

module.exports = options => {
    return async function wechart(ctx, next) {
        let wxconfig = await options.app.mysql.get('wx_config', {
            "RECID": options.Id
        })
        let UpDatewxconfig = null;
        //获取 access_tooken
        const getAccessToken = function () {
            return new Promise((resolve, reject) => {
                let prefix = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + wxconfig.APP_ID + "&secret=" + wxconfig.APP_SECRET;
                request.get(prefix, function optionalCallback(err, httpResponse, body) {
                    if (err) {
                        reject('失败');
                    } else {
                        resolve(body);
                    }
                })
            });
        }
        //获取 jsapi_ticket
        const getJsspiTicket = function () {
            return new Promise((resolve, reject) => {
                request.get(" https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + UpDatewxconfig.ACCESS_TOKEN_VALUE + "&type=jsapi", function optionalCallback(err, httpResponse, body) {
                    if (err) {
                        reject('失败')
                    } else {
                        resolve(body)
                    }
                })
            });
        }
        // 保存或更新 access_tooken 和 jsapi_ticket
        const handleTookenTicket = async () => {
            let AccessToken = await getAccessToken();
            const data = {};
            data.ACCESS_TOKEN_VALUE = JSON.parse(AccessToken).access_token;
            let now = (new Date().getTime());
            data.ACCESS_TOKEN_UPDATE_TIME = new Date(now + (JSON.parse(AccessToken).expires_in - 20) * 1000);
            const result = await options.app.mysql.update('wx_config', data, {
                where: {
                    RECID: options.Id
                }
            });
            UpDatewxconfig = await options.app.mysql.get('wx_config', {
                "RECID": options.Id
            })
            let JsspiTicket = await getJsspiTicket();
            const TicketData = {};
            data.JS_TICKET_VALUE = JSON.parse(JsspiTicket).ticket;
            let TickTime = (new Date().getTime());
            data.JS_TICKET_UPDATE_TIME = new Date(TickTime + (JSON.parse(JsspiTicket).expires_in - 20) * 1000);
            const TicketResult = await options.app.mysql.update('wx_config', data, {
                where: {
                    RECID: options.Id
                }
            });
        }
        if (!wxconfig.ACCESS_TOKEN_VALUE || !wxconfig.ACCESS_TOKEN_UPDATE_TIME) {
            await handleTookenTicket()
        } else {
            let AccessToken = wxconfig.ACCESS_TOKEN_VALUE;
            let expiresIn = wxconfig.ACCESS_TOKEN_UPDATE_TIME.getTime()
            let now = (new Date().getTime());
            if (now < expiresIn) {

            } else {
                await handleTookenTicket()
            }
        }
        await (next())
    }
}
