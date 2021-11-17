const { History } = require('../db/model/index')

async function getHistoryList() {
  const result = await History.findAll({
    attributes: ['id', 'userId', 'taskId', 'dropTime', 'fromId', 'toId']
  })
  return result
}

module.exports = {
  getHistoryList
}
