const Result = require('../models/Result')

const { getTaskList } = require('../services/task')

async function listResult(userId) {

  const result = await getTaskList(userId)
  if(result == null) {
    return new Result('列表为空').success()
  } else {
    return new Result(result, '获取列表成功').success()
  }
}

module.exports = {
  listResult
}
