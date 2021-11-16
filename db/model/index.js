const User = require('./table/User')
const Task = require('./table/Task')
const Pond = require('./table/Pond')

Task.belongsTo(User, {
  foreignKey: 'userId'
})

User.hasMany(Task, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Task,
  Pond
}