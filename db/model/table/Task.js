const seq = require('../../seq')
const { STRING, INTEGER, DATE } = require('../../types')

const Task = seq.define('task', {
  userId: {
    type: INTEGER,
    allowNull: false
  },
  describe: {
    type: STRING,
    allowNull: false,
  },
  belong: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  importance: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  urgency: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  startAt: {
    type: DATE,
    allowNull: true,
    defaultValue: seq.NOW
  },
  endAt: {
    type: DATE,
    allowNull: true,
    defaultValue: seq.NOW
  },
  sort: {
    type: INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Task
