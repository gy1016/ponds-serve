const seq = require('../../seq')
const { STRING, DATE } = require('../../types')

const User = seq.define('user', {
  username: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: true,
    defaultValue: "visitor"
  },
  avatar: {
    type: STRING,
    allowNull: false,
    defaultValue: "https://s3.bmp.ovh/imgs/2021/11/f4919f5e2b8f7494.jpg",
  },
  registerAt: {
    type: DATE,
    allowNull: true
  }
}, {
  timestamps: false
});

module.exports = User
