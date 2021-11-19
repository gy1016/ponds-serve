const router = require('koa-router')()
router.prefix('/api/user')

const { loginResult, me, registerResult } = require('../../controllers/user')

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

// 注册
router.post('/register', async (ctx, next) => {
  // console.log(ctx.request.body)
  let {username, password} = ctx.request.body
  ctx.body = await registerResult({username, password})
})

module.exports = router