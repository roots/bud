const {clearBudfiles} = require('../clearBudfiles')

module.exports = async function config() {
  await clearBudfiles()
}
