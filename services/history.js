const { History } = require('../db/model/index')

async function getHistoryList(userId) {
  const result = await History.findAll({
    attributes: ['id', 'userId', 'taskId', 'dropTime', 'fromId', 'toId'],
    where: {
      userId
    }
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
