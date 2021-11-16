const router = require('koa-router')()
router.prefix('/api/task')

const { 
  listResult,
  addResult 
} = require('../../controllers/task')

// 根据用户id获取任务列表
router.get('/list', async (ctx, next) => {
  const { userId } = ctx.query
  ctx.body = await listResult(userId)
})

// 新增任务
router.post('/add', async (ctx, next) => {
  const {belong, userId, describe} = ctx.request.body
  ctx.body = await addResult({belong, userId, describe})
})

module.exports = router