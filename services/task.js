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

async function addTask({belong, userId, describe}) {
  const res = await Task.create({
    belong,
    userId,
    describe
  })
  return res.dataValues
}

async function getTaskInfo(id) {
  if (!id) {console.log('haha'); return null}
  const res = await Task.findOne({
    attributes: ['id', 'describe', 'belong', 'importance', 'urgency', 'startAt', 'endAt'],
    where: {
      id
    }
  })
  return res.dataValues
}

async function editTask(data) {
  const {describe, importance, urgency, startAt, endAt, belong, id} = data
  const res = await Task.update({
    describe,
    importance,
    urgency,
    startAt,
    endAt,
    belong
  },{
    where: {id}
  })
  return res
}

module.exports = {
  getTaskList,
  addTask,
  getTaskInfo,
  editTask
}
