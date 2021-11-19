const Result = require('../models/Result')

const { getPondList, reorderPonds } = require('../services/pond')

async function listResult() {

  const result = await getPondList()
  if(result == null) {
    return new Result('列表为空').success()
  } else {
    return new Result(result, '获取列表成功').success()
  }
}

async function reorderResult({fromId, referenceId, tag, type}) {
  const result = await reorderPonds({fromId, referenceId, tag, type})
  if(!result) {
    return new Result('更新失败').fail()
  } else {
    return new Result(result, '更新成功').success()
  }
}

module.exports = {
  listResult,
  reorderResult
}
