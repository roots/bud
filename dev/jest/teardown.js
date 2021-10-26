/* eslint-disable no-console */
// @ts-check

const execa = require('execa')
const {noop} = require('lodash')
const {magenta} = require('chalk')
const {copy} = require('fs-extra')
const path = require('path')

const manifestTmpPath = path.resolve(
  __dirname,
  'util',
  'resolver',
  'package.tmp.json',
)

const manifestPath = path.resolve(
  __dirname,
  'util',
  'resolver',
  'package.json',
)

/**
 * Setup integration tests
 */
module.exports = async () => {
  try {
    console.log(magenta`\n Restoring resolver package.json\n`)
    await copy(manifestTmpPath, manifestPath, {overwrite: true})

    console.log(magenta`\n Resetting yarn.lock\n`)

    const buildtask = execa.command(`yarn`)
    buildtask.stdout.pipe(process.stdout)
    buildtask.stderr.pipe(process.stderr)
    await buildtask.finally(noop)
  } catch (e) {
    console.info('yarn.lock could not be restored')
    console.log(e)
  }
}
