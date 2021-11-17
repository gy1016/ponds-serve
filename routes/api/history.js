const router = require('koa-router')()
router.prefix('/api/history')

const { listResult, addResult } = require('../../controllers/history')

// 根据用户Id获取拖拽纪录列表
router.get('/list', async (ctx, next) => {
  const { userId } = ctx.query
  ctx.body = await listResult(userId)
})

// 添加拖拽记录
router.post('/add', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await addResult(data)
})

module.exports = router