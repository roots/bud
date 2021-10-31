/* eslint-disable no-console */
// @ts-check

const fs = require('fs-extra')

module.exports = async () => {
  await fs.copy(
    `${process.cwd()}/examples/`,
    __dirname.concat('tmp'),
  )
}
