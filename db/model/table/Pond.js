const seq = require('../../seq')
const { STRING, INTEGER } = require('../../types')

const Pond = seq.define('pond', {
  name_cn: {
    type: STRING,
    allowNull: false
  },
  name_en: {
    type: STRING,
    allowNull: false,
  },
  sort: {
    type: INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Pond
