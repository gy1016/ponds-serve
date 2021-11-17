const { Pond } = require('../db/model/index')
const sequelize = require('sequelize')
const { Op } = require("sequelize");

async function getPondList() {
  const result = await Pond.findAll({
    attributes: ['id', 'name_cn', 'name_en', 'sort'],
    order: [
      ['sort', 'ASC']
    ]
  })
  return result
}

async function reorderPonds({fromId, referenceId, tag, type}) {
  // console.log("fromId",fromId,"referenceId",referenceId,type)
  if (type === 'after') {
    if (fromId < referenceId) {
      const u1 = await Pond.update({sort: sequelize.literal('sort-1')}, {
        where: {
          sort: {
            [Op.between]: [fromId+1, referenceId],
          }
        }
      })
      const u2 = await Pond.update({sort: referenceId}, {
        where: {
          id: tag
        }
      })
      return u1 && u2
    }
    if (fromId > referenceId) {
      const u1 = await Pond.update({sort: sequelize.literal('sort+1')}, {
        where: {
          sort: {
            [Op.between]: [referenceId+1, fromId-1],
          }
        }
      })
      const u2 = await Pond.update({sort: referenceId+1}, {
        where: {
          id: tag
        }
      })
      return u1 && u2
    }
  }
  if (type === 'before') {
    if (fromId < referenceId) {
      const u1 = await Pond.update({sort: sequelize.literal('sort-1')}, {
        where: {
          sort: {
            [Op.between]: [fromId+1, referenceId-1],
          }
        }
      })
      const u2 = await Pond.update({sort: referenceId-1}, {
        where: {
          id: tag
        }
      })
      return u1 && u2
    }
    if (fromId > referenceId) {
      const u1 = await Pond.update({sort: sequelize.literal('sort+1')}, {
        where: {
          sort: {
            [Op.between]: [referenceId, fromId-1],
          }
        }
      })
      const u2 = await Pond.update({sort: referenceId}, {
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
  getPondList,
  reorderPonds
}
