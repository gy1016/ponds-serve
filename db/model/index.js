const User = require('./table/User')
const Task = require('./table/Task')

Task.belongsTo(User, {
  foreignKey: 'userId'
})

User.hasMany(Task, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Task
}