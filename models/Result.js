const { CODE_ERROE, CODE_SUCCESS, CODE_TOKEN_EXOIRED } = require('../config')

class Result {
  constructor(data, msg = '操作成功', options) {
    this.data = null
    if(arguments.length === 0) {
      this.msg = '操作成功'
    } else if(arguments.length === 1) {
      this.msg = data
    } else {
      this.data = data
      this.msg = msg
      if(options) {
        this.options = options
      }
    }
  }

  createResult() {
    if(!this.code) {
      this.code = CODE_SUCCESS
    }
    let base = {
      code: this.code,
      msg: this.msg
    }
    if(this.data) {
      base.data = this.data
    }
    if(this.options) {
      base = { ...base, ...this.options }
    }
    return base
  }

  success() {
    this.code = CODE_SUCCESS
    return this.createResult()
  }

  fail() {
    this.code = CODE_ERROE
    return this.createResult()
  }

  jwtError() {
    this.code = CODE_TOKEN_EXOIRED
    return this.createResult()
  }
}

module.exports = Result