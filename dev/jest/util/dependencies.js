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

const cachePath = path.resolve(
  __dirname,
  'resolver',
  '.budfiles',
  'bud.cache.json',
)

async function build() {
  console.log(
    magenta`\n Producing resolver workspace bud.cache.json`,
  )

  const task = execa.command(
    `yarn workspace bud-examples-resolver run bud build`,
    {
      cwd: path.dirname(manifestPath),
    },
  )
  task.stdout.pipe(process.stdout)
  task.stderr.pipe(process.stderr)
  await task.finally(noop)
}

async function install() {
  await build()

  console.log(
    magenta`\n Ensuring required dependencies are available to integration projects \n`,
  )
  const cache = await readJson(cachePath)

  const installString = Object.entries(
    cache.project.peers,
  ).reduce((acc, [k, {name, version}]) => {
    return `${acc} ${name}@${version}`
  }, `yarn workspace bud-examples-resolver add`)

  const task = execa.command(installString)
  task.stdout.pipe(process.stdout)
  task.stderr.pipe(process.stderr)
  await task.finally(noop)
}

module.exports = {install}
