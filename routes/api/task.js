const router = require('koa-router')()
router.prefix('/api/task')

const { listResult } = require('../../controllers/task')

// 根据用户id获取任务列表
router.get('/list', async (ctx, next) => {
  const { userId } = ctx.query
  ctx.body = await listResult(userId)
})

module.exports = router