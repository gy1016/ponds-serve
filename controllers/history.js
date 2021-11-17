const Result = require('../models/Result')

const { getHistoryList } = require('../services/history')

async function listResult(userId) {

  const result = await getHistoryList(userId)
  if(result == null) {
    return new Result('历史列表为空').success()
  } else {
    return new Result(result, '获取历史列表成功').success()
  }
}

module.exports = {
  listResult
}
