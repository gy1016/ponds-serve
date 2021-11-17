const userRouter = require('./api/user')
const taskRouter = require('./api/task')
const pondRouter = require('./api/pond')
const historyRouter = require('./api/history')

const routers = [userRouter, taskRouter, pondRouter, historyRouter]

module.exports = routers