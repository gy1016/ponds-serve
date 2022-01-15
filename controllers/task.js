const Result = require('../models/Result')

const { getTaskList, addTask, getTaskInfo, delTaskInfo, editTask, reorderTasks } = require('../services/task')

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
    return new Result('添加失败').fail()
  }
  return new Result('添加成功').success()
}

async function infoResult(id) {
  if (id == 0) return new Result('这个是隐藏数据哦').success()
  const res = await getTaskInfo(id)
  if (res == null) {
    return new Result('获取信息失败').fail()
  }
  return new Result(res, '获取信息成功').success()
}

async function delResult(id, sort) {
  const res = await delTaskInfo(id, sort)
  if (res == null) {
    return new Result('删除任务失败').fail()
  }
  return new Result(res, '删除任务成功').success()
}

async function editResult(data) {
  const res =  await editTask(data)
  if(res) {
    return new Result('更新信息成功').success()
  }
  return new Result('获取信息失败').fail()
}

async function reorderResult({fromId, fromPondId, referenceId, toPondId, type, tag}) {
  const result = await reorderTasks({fromId, fromPondId, referenceId, toPondId, type, tag})
  if(!result) {
    return new Result('更新失败').success()
  } else {
    return new Result(result, '更新成功').success()
  }
}

module.exports = {
  listResult,
  addResult,
  delResult,
  infoResult,
  editResult,
  reorderResult
}
