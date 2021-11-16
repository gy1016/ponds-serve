const Result = require('../models/Result')

const { getTaskList, addTask } = require('../services/task')

async function listResult(userId) {

  const result = await getTaskList(userId)
  if(result == null) {
    return new Result('列表为空').success()
  } else {
    return new Result(result, '获取列表成功').success()
  }
}

async function addResult({belong, userId, describe}) {
  const res = await addTask({belong, userId, describe})
  if (res == null) {
    return new Result('添加失败').success()
  }
  return new Result('添加成功').success()
}

module.exports = {
  listResult,
  addResult
}
