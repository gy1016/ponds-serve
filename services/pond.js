const { Pond } = require('../db/model/index')

async function getPondList() {
  const result = await Pond.findAll({
    attributes: ['id', 'name_cn', 'name_en', 'sort'],
    order: [
      ['sort', 'ASC']
    ]
  })
  return result
}

module.exports = {
  getPondList
}
