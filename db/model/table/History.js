const seq = require('../../seq')
const { INTEGER, DATE } = require('../../types')

const History = seq.define('history', {
  userId: {
    type: INTEGER,
    allowNull: false
  },
  taskId: {
    type: INTEGER,
    allowNull: false,
  },
  dropTime: {
    type: DATE,
    allowNull: true,
    defaultValue: seq.NOW
  },
  fromId: {
    type: INTEGER,
    allowNull: false
  },
  toId: {
    type: INTEGER,
    allowNull: false
  },
}, {
  timestamps: false
});

module.exports = History
