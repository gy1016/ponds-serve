const userRouter = require('./api/user')
const taskRouter = require('./api/task')
const pondRouter = require('./api/pond')

const routers = [userRouter, taskRouter, pondRouter]

module.exports = routers