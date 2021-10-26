const clearBudfiles = require('./util/clearBudfiles')
const {install} = require('./util/dependencies')

module.exports = async function config() {
  await clearBudfiles()
  await install()
}
