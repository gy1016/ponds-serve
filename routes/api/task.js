const router = require('koa-router')()
router.prefix('/api/task')

const { 
  listResult,
  addResult,
  infoResult,
  editResult,
  reorderResult
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

// 根据任务编号获取任务信息
router.get('/info', async (ctx, next) => {
  const { id } = ctx.query
  ctx.body = await infoResult(id)
})

// 更新任务信息
router.post('/edit', async (ctx, next) => {
  const data = ctx.request.body
  ctx.body = await editResult(data)
})

// 根据payload重新排序
// 根据fromId, referenceId, type对池子进行重新排序
router.post('/reorder', async (ctx, next) => {
  const {fromId, fromPondId, referenceId, toPondId, type, tag} = ctx.request.body
  ctx.body = await reorderResult({fromId, fromPondId, referenceId, toPondId, type, tag})
})

module.exports = router