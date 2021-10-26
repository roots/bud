/* eslint-disable no-console */
// @ts-check

const globby = require('globby')
const execa = require('execa')
const {dirname} = require('path')
const {noop} = require('lodash')
const {bold} = require('chalk')
const clearBudfiles = require('./util/clearBudfiles')
const {install} = require('./util/dependencies')

/**
 * Setup integration tests
 */
module.exports = async () => {
  await clearBudfiles()
  await install()

  /**
   * Get manifest paths
   */
  console.log('Reading the projects dir')
  let manifestPaths = await globby('examples/*/package.json')
  manifestPaths = manifestPaths.filter(s =>
    s.includes('examples/bedrock/package.json') ||
    s.includes('examples/node-api/package.json') ||
    s.includes('examples/multi-compiler/package.json')
      ? false
      : true,
  )

  console.log('manifest paths discovered:')
  manifestPaths.map(s => console.log(`- ${s}`))

  await manifestPaths.reduce(async (promised, path) => {
    await promised

    const directory = process.cwd().concat(`/${dirname(path)}`)
    const name = directory.split('examples/')[1]

    console.log('\n ', bold.underline`${name}`)
    console.log(`  path: ${directory}`)

    const buildtask = execa.command(
      `yarn bud build --log --ci`,
      {
        cwd: directory,
      },
    )
    buildtask.stdout.pipe(process.stdout)
    buildtask.stderr.pipe(process.stderr)
    await buildtask.finally(noop)

    return Promise.resolve({})
  }, Promise.resolve({}))
}
