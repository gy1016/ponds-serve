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
    type: STRING,
    allowNull: false,
    defaultValue: 'plan-pond'
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
    allowNull: false,
    defaultValue: new Date()
  },
  endAt: {
    type: DATE,
    allowNull: false,
    defaultValue: new Date()
  }
}, {
  timestamps: false
});

module.exports = Task
