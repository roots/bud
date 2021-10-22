/* eslint-disable no-console */
const globby = require('globby')
const execa = require('execa')
const {readFile} = require('fs-extra')
const {dirname} = require('path')
const {noop} = require('lodash')
const chalk = require('chalk')

/**
 * Setup integration tests
 */
module.exports = async function () {
  console.log('Reading the projects dir')

  const paths = await globby('examples/*/package.json')

  console.log(' paths discovered:')
  paths.map(s => console.log(`- ${s}`))

  const packages = await paths.reduce(
    async (promised, path, i) => {
      let accumulator = await promised

      if (i !== 0) {
        console.log(
          chalk.green(`\n Completed ${i}/${paths.length}`),
        )
      }

      const name = path.split('examples/')[1].split('/')[0]

      console.log(chalk.white.bold(`\n ${name}`))

      console.log(
        chalk.blue(
          `\n [${name}] Reading and storing package.json`,
        ),
      )

      const stringyFile = await readFile(path, 'utf8')

      console.log(
        chalk.blue(` [${name}] Installing dependencies\n`),
      )

      const initttask = execa.command(`yarn bud init`, {
        cwd: dirname(path),
      })
      initttask.stdout.pipe(process.stdout)
      initttask.stderr.pipe(process.stderr)
      await initttask.finally(noop)

      console.log(chalk.blue(`\n [${name}] Building project\n`))

      const buildtask = execa.command(
        `yarn bud build --log --ci`,
        {
          cwd: dirname(path),
        },
      )
      buildtask.stdout.pipe(process.stdout)
      buildtask.stderr.pipe(process.stderr)
      await buildtask.finally(noop)

      return {
        ...accumulator,
        [`${path}`]: [stringyFile],
      }
    },
    Promise.resolve([]),
  )

  /**
   * Assign all packages to global so we can uninstall on exit
   */
  global.packages = packages

  return global
}
