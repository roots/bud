/* eslint-disable no-console */
// @ts-check

const chalk = require('chalk')
const fs = require('fs-extra')
const execa = require('execa')
const clearArtifacts = require('./clearArtifacts')
const paths = require('./paths')

module.exports = async () => {
  await clearArtifacts()

  const examples = await paths()

  console.log(chalk.blue`\ninitializing\n`)

  await Promise.allSettled(
    examples.map(async ex => {
      const init = execa.command(`yarn bud init`, {
        cwd: ex.cwd,
      })

      await init
        .then(() => console.log(chalk.green`${ex.name}`))
        .catch(async err => {
          await fs.writeFile(
            ex.cwd.concat('/err.log'),
            err.stdout,
          )
          console.log(chalk.red`${ex.name}`)
        })

      const killed = init.kill()
      killed && console.log(`${ex.name} build killed`)

      Promise.resolve()
    }),
  )

  console.log(chalk.blue`\nbuilding\n`)

  await Promise.allSettled(
    examples.map(async ex => {
      const build = execa.command(`yarn bud build`, {
        cwd: ex.cwd,
      })

      await build
        .then(() => console.log(chalk.green`${ex.name}`))
        .catch(async err => {
          await fs.writeFile(
            ex.cwd.concat('/err.log'),
            err.stdout,
          )
          console.log(chalk.red`${ex.name}`)
        })

      const killed = build.kill()
      killed && console.log(`${ex.name} build killed`)

      Promise.resolve()
    }),
  )

  global.examples = examples
}
