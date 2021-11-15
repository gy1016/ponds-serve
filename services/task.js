const { Task } = require('../db/model/index')

async function getTaskList(userId) {
  const result = await Task.findAll({
    attributes: ['id', 'describe', 'belong', 'importance', 'urgency', 'startAt', 'endAt'],
    where: {
      userId: Number(userId)
    }
  })
  return result
}

module.exports = {
  getTaskList
}
