const jwt = require('koa-jwt')
const { PRIVATE_KEY } =require('../config')

module.exports = jwt({
  secret: PRIVATE_KEY
}).unless({
  path: [
    '/',
    '/api/user/login'
  ]
})