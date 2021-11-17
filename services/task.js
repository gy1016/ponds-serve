const { Task } = require('../db/model/index')
const sequelize = require('sequelize')
const { Op } = require("sequelize");

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

async function reorderTasks({fromId, fromPondId, referenceId, toPondId, type, tag}) {
  if (fromPondId !== toPondId) {
    await Task.update({belong: toPondId}, {
      where: {
        id: tag
      }
    })
  }
  if (type === 'after') {
    if (fromId < referenceId) {
      const u1 = await Task.update({sort: sequelize.literal('sort-1')}, {
        where: {
          sort: {
            [Op.between]: [fromId+1, referenceId],
          }
        }
      })
      const u2 = await Task.update({sort: referenceId}, {
        where: {
          id: tag
        }
      })
      return u1 && u2
    }
    if (fromId > referenceId) {
      const u1 = await Task.update({sort: sequelize.literal('sort+1')}, {
        where: {
          sort: {
            [Op.between]: [referenceId+1, fromId-1],
          }
        }
      })
      const u2 = await Task.update({sort: referenceId+1}, {
        where: {
          id: tag
        }
      })
      return u1 && u2
    }
  }
  if (type === 'before') {
    if (fromId < referenceId) {
      const u1 = await Task.update({sort: sequelize.literal('sort-1')}, {
        where: {
          sort: {
            [Op.between]: [fromId+1, referenceId-1],
          }
        }
      })
      const u2 = await Task.update({sort: referenceId-1}, {
        where: {
          id: tag
        }
      })
      return u1 && u2
    }
    if (fromId > referenceId) {
      const u1 = await Task.update({sort: sequelize.literal('sort+1')}, {
        where: {
          sort: {
            [Op.between]: [referenceId, fromId-1],
          }
        }
      })
      const u2 = await Task.update({sort: referenceId}, {
        where: {
          id: tag
        }
      })
      return u1 && u2
    }
  }
  return false
}

module.exports = {
  getTaskList,
  addTask,
  getTaskInfo,
  editTask,
  reorderTasks
}
