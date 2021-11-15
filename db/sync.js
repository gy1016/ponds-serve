require('./model/index')

const seq = require('./seq')

try {
  seq.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})