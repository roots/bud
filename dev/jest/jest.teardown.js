/* eslint-disable no-console */
const {writeFileSync} = require('fs-extra')

/**
 * Teardown integration tests
 */
module.exports = async () => {
  Object.entries(global.packages).forEach(([k, v]) => {
    console.log(`Restoring ${k}`)
    writeFileSync(k, v.pop(), 'utf8')
  })
}
