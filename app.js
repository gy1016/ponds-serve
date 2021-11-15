const Koa = require('koa')
const app = new Koa()

// 中间件
const bodyParser = require('koa-bodyparser')({enableTypes:['json', 'form', 'text']})
app.use(bodyParser)

const cors = require('koa2-cors')
// const { corsHandler } = require('./middlewares/cors')
app.use(cors())

const jwtAuth = require('./middlewares/jwt')
app.use(jwtAuth)

// 路由
const routers = require('./routes')
for(let router of routers) {
  app.use(router.routes(), router.allowedMethods())
}

// 错误处理
const Result = require('./models/Result')
app.on('error', (err, ctx) => {
  if(err.name && err.name  === 'UnauthorizedError') {
    // console.log(ctx)
    ctx.res.end(JSON.stringify(new Result(null, 'Token验证失败').jwtError()))
  } else {
    console.error('server error', err, ctx)
  }
  throw(err)
})

module.exports = app
