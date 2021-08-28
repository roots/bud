/* eslint-disable no-console */
const execa = require('execa')
const {writeFileSync} = require('fs-extra')

module.exports = async () => {
  Object.entries(global.packages).forEach(([k, v]) => {
    console.log(`Restoring ${k}`)
    writeFileSync(k, v.pop(), 'utf8')
  })

  execa.commandSync(`yarn`)
}
