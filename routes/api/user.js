const router = require('koa-router')()
router.prefix('/api/user')

const { loginResult, me } = require('../../controllers/user')

// 登录
router.post('/login', async (ctx, next) => {
  // console.log(ctx.request.body)
  let {username, password} = ctx.request.body
  ctx.body = await loginResult({username, password})
})

// 获取用户信息
router.get('/me', async (ctx, next) => {
  // console.log(ctx.request.header.authorization)
  ctx.body = await me(ctx.request.header.authorization)
})

module.exports = router