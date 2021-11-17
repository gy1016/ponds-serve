const User = require('./table/User')
const Task = require('./table/Task')
const Pond = require('./table/Pond')
const History = require('./table/History')

Pond.hasMany(Task, {
  foreignKey: 'belong'
})

Task.belongsTo(Pond, {
  foreignKey: 'belong'
})

Task.belongsTo(User, {
  foreignKey: 'userId'
})

User.hasMany(Task, {
  foreignKey: 'userId'
})

History.belongsTo(User, {
  foreignKey: 'userId'
})

User.hasMany(History, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Task,
  Pond,
  History
}