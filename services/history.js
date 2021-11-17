const { History } = require('../db/model/index')

async function getHistoryList() {
  const result = await History.findAll({
    attributes: ['id', 'userId', 'taskId', 'dropTime', 'fromId', 'toId']
  })
  return result
}

async function addHistory(data) {
  const {userId, taskId, fromId, toId} = data
  const res = await History.create({
    userId,
    taskId,
    fromId,
    toId
  })
  return res.dataValues
}

module.exports = {
  getHistoryList,
  addHistory
}
