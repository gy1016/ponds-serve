const router = require('koa-router')()
router.prefix('/api/history')

const { listResult } = require('../../controllers/history')

// 根据用户Id获取拖拽列表
router.get('/list', async (ctx, next) => {
  const { userId } = ctx.query
  ctx.body = await listResult(userId)
})

module.exports = router