const { User } = require('../db/model/index')

async function isExist(username) {
  const result = await User.findOne({
    where: {
      username
    }
  })
  if(result == null) {
    return false
  }
  return true
}

async function login({username, password}) {
  const result = await User.findOne({
    attributes: ['id', 'username', 'role', 'avatar'],
    where: {
      username,
      password
    }
  })
  if(result == null) {
    return result
  }
  return result.dataValues
}

async function getUserInfo(username) {
  const result = await User.findOne({
    attributes: ['id', 'username', 'role', 'avatar'],
    where: {
      username
    }
  })
  if(result == null) {
    return result
  }
  return result.dataValues
}

module.exports = {
  isExist,
  login,
  getUserInfo
}
