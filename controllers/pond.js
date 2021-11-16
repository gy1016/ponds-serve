const Result = require('../models/Result')

const { getPondList } = require('../services/pond')

async function listResult() {

  const result = await getPondList()
  if(result == null) {
    return new Result('列表为空').success()
  } else {
    return new Result(result, '获取列表成功').success()
  }
}

module.exports = {
  listResult
}
