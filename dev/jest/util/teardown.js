/* eslint-disable no-console */
// @ts-check

const path = require('path')
const fs = require('fs-extra')

module.exports = async () => {
  await fs.copy(
    path.join(process.cwd(), 'dev', 'jest', 'util', '.tmp'),
    path.join(process.cwd(), 'examples'),
  )
}
