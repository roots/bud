const clearBudfiles = require('./util/clearBudfiles')

module.exports = async function config() {
  await clearBudfiles()
}
