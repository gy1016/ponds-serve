const router = require('koa-router')()
router.prefix('/api/pond')

const { listResult } = require('../../controllers/pond')

// 按照sort字段获取池子列表
router.get('/list', async (ctx, next) => {
  ctx.body = await listResult()
})

module.exports = router