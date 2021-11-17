const Result = require('../models/Result')

const { getHistoryList, addHistory } = require('../services/history')

async function listResult(userId) {

  const result = await getHistoryList(userId)
  if(result == null) {
    return new Result('历史列表为空').success()
  } else {
    return new Result(result, '获取历史列表成功').success()
  }
}

async function addResult(data) {
  const res = await addHistory(data)
  if (res == null) {
    return new Result('添加失败').success()
  }
  return new Result('添加成功').success()
}


module.exports = {
  listResult,
  addResult
}
