const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config')
const { host, user, password, database } = MYSQL_CONF
const conf = {
  host,
  dialect: 'mysql'
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
