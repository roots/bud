/* eslint-disable no-console */
const execa = require('execa')
const {readJson} = require('fs-extra')
const path = require('path')
const {noop} = require('lodash')
const {magenta} = require('chalk')

const manifestPath = path.resolve(
  __dirname,
  'resolver',
  'package.json',
)

async function tasks() {
  const init = execa.command(`yarn bud init`, {
    cwd: path.dirname(manifestPath),
  })

  init.stdout.pipe(process.stdout)
  init.stderr.pipe(process.stderr)
  await init.finally(noop)
}

async function install() {
  await tasks()

  console.log(
    magenta`\n Ensuring required dependencies are available to integration projects\n`,
  )
}

module.exports = {install}
