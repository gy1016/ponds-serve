const router = require('koa-router')()
router.prefix('/api/pond')

const { listResult, reorderResult } = require('../../controllers/pond')

// 按照sort字段获取池子列表
router.get('/list', async (ctx, next) => {
  ctx.body = await listResult()
})

// 根据fromId, referenceId, type对池子进行重新排序
router.post('/reorder', async (ctx, next) => {
  const {fromId, referenceId, tag, type} = ctx.request.body
  ctx.body = await reorderResult({fromId, referenceId, tag, type})
})

module.exports = router