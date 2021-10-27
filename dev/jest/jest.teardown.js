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

module.exports = async () => {
  try {
    console.log(magenta`\n Restoring resolver package.json`)

    await copy(manifestTmpPath, manifestPath, {overwrite: true})

    console.log(magenta`\n Restoring yarn.lock`)
    console.log(
      `\n Console output silenced. Practice patience\n`,
    )
    const task = execa.command(`yarn`)
    task.stderr.pipe(process.stderr)
    await task.finally(noop)
  } catch (e) {
    console.info('yarn.lock could not be restored')
    console.log(e)
  }
}
