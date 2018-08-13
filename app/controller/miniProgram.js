'use strict'

const Controller = require('egg').Controller;

class MiniProgramController extends Controller {
    async test(ctx) {
        return ctx.body = 111
    }
}

module.exports = MiniProgramController