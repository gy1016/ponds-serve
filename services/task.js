const { Task } = require('../db/model/index')
const sequelize = require('sequelize')

async function getTaskList(userId) {
  const result = await Task.findAll({
    attributes: ['id', 'describe', 'belong', 'importance', 'urgency', 'startAt', 'endAt', 'sort'],
    where: {
      userId: Number(userId)
    },
    order: [
      ['sort', 'ASC']
    ]
  })
  return result
}

async function addTask({belong, userId, describe}) {
  const total = await Task.count()
  console.log(total,'#############################################################')

  const res = await Task.create({
    belong,
    userId,
    describe,
    sort: total + 1
  })
  return res.dataValues
}

async function getTaskInfo(id) {
  if (!id) {console.log('haha'); return null}
  const res = await Task.findOne({
    attributes: ['id', 'describe', 'belong', 'importance', 'urgency', 'startAt', 'endAt', 'sort'],
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
