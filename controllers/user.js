const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, JWT_EXPIRED } = require('../config')

const Result = require('../models/Result')

const { md5, decoded } = require('../utils')
const { PWD_SALT } = require('../config')

const { isExist, login, getUserInfo } = require('../services/user')

async function loginResult(param) {
  let { username, password } = param
  const exist = await isExist(username)
  if (exist) {
    // 用户名存在，校验密码
    password = md5(`${password}${PWD_SALT}`)
    const result = await login({username, password})
    if(result == null) {
      return new Result('密码错误').success()
    } else {
      const { id, username, role, avatar } = result
      const token = jwt.sign(
        { username },
        PRIVATE_KEY,
        {expiresIn: JWT_EXPIRED}
        )
      return new Result({ id, username, role, avatar, token }, '登陆成功').success()
    }
  } else {
    // 用户名不存在
    return new Result('用户名不存在').success()
  }
}

async function me(token) {
  const {username} = decoded(token)
  return new Result(await getUserInfo(username), '获取用户信息成功').success()
}

module.exports = {
  loginResult,
  me
}
