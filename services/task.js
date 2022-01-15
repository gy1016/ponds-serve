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
  console.log(userId)
  const total = await Task.count({
    where: {
      userId,
      belong
    }
  })
  console.log(total)
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

async function delTaskInfo(id, sort) {
  if (!id) {console.log('haha'); return null}

  const res = await Task.destroy({
    where: {
      id
    }
  })
  const u1 = await Task.update({sort: sequelize.literal('sort-1')}, {
    where: {
      sort: {
        [Op.gt]: sort
      }
    }
  })

  return u1
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
  // 如果不在同一个池子里面
  if (fromPondId !== toPondId) {
    // 1. 修改fromTask(即tag)的belong为toPondId
    await Task.update({belong: toPondId}, {
      where: {
        id: tag
      }
    })
    // 2. 将fromPondId中大于tag的sort的sort-1
    await Task.update({sort: sequelize.literal('sort-1')}, {
      where: {
        belong: fromPondId,
        sort: {
          [Op.gt]: fromId + 1
        }
      }
    })
    // 3. 将toPondId中大于referenceId的所有task的sort+1
    await Task.update({sort: sequelize.literal('sort+1')}, {
      where: {
        belong: toPondId,
        sort: {
          [Op.gt]: referenceId
        }
      }
    })
    // 4. 将tag的sort设置为referenceId+1
    await Task.update({sort: referenceId + 1}, {
      where: {
        id: tag
      }
    })
    return true
  }
  // fromId与referenceId是从0开始的，而我们的sort是从1开始的
  if (type === 'after') {
      const u1 = await Task.update({sort: sequelize.literal('sort-1')}, {
        where: {
          sort: {
            [Op.between]: [fromId+2, referenceId+1],
          }
        }
      })
      const u2 = await Task.update({sort: referenceId+1}, {
        where: {
          id: tag
        }
      })
      return u1 && u2
    // if (fromId < referenceId) {
    //   const u1 = await Task.update({sort: sequelize.literal('sort-1')}, {
    //     where: {
    //       sort: {
    //         [Op.between]: [fromId+1, referenceId],
    //       }
    //     }
    //   })
    //   const u2 = await Task.update({sort: referenceId}, {
    //     where: {
    //       id: tag
    //     }
    //   })
    //   return u1 && u2
    // }
    // if (fromId > referenceId) {
    //   const u1 = await Task.update({sort: sequelize.literal('sort+1')}, {
    //     where: {
    //       sort: {
    //         [Op.between]: [referenceId+1, fromId-1],
    //       }
    //     }
    //   })
    //   const u2 = await Task.update({sort: referenceId+1}, {
    //     where: {
    //       id: tag
    //     }
    //   })
    //   return u1 && u2
    // }
  }
  if (type === 'before') {
    // if (fromId < referenceId) {
    //   const u1 = await Task.update({sort: sequelize.literal('sort-1')}, {
    //     where: {
    //       sort: {
    //         [Op.between]: [fromId+1, referenceId-1],
    //       }
    //     }
    //   })
    //   const u2 = await Task.update({sort: referenceId-1}, {
    //     where: {
    //       id: tag
    //     }
    //   })
    //   return u1 && u2
    // }
    // if (fromId > referenceId) {
    //   const u1 = await Task.update({sort: sequelize.literal('sort+1')}, {
    //     where: {
    //       sort: {
    //         [Op.between]: [referenceId, fromId-1],
    //       }
    //     }
    //   })
    //   const u2 = await Task.update({sort: referenceId}, {
    //     where: {
    //       id: tag
    //     }
    //   })
    //   return u1 && u2
    // }
    const u1 = await Task.update({sort: sequelize.literal('sort+1')}, {
      where: {
        sort: {
          [Op.between]: [referenceId+1, fromId],
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
  return false
}

module.exports = {
  getTaskList,
  addTask,
  getTaskInfo,
  editTask,
  reorderTasks,
  delTaskInfo
}
