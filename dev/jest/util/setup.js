/* eslint-disable no-console */
// @ts-check

const execa = require('execa')
const chalk = require('chalk')
const clearArtifacts = require('./clearArtifacts')
const paths = require('./paths')

module.exports = async () => {
  await clearArtifacts()

  const examples = await paths()

  await Promise.all(
    examples.map(async ex => {
      try {
        const init = execa.command(`yarn bud init`, {
          cwd: ex.cwd,
        })
        init.on('data', data =>
          process.stdout.write(
            chalk.blue`${ex.name}`.concat(` | `).concat(data),
          ),
        )
        init.on('err', data =>
          process.stdout.write(
            chalk.blue`${ex.name}`.concat(` | `).concat(data),
          ),
        )
        await init
      } catch (err) {
        console.log(err)
      }

      return ex
    }),
  )

  await Promise.all(
    examples.map(async ex => {
      try {
        const build = execa.command(`yarn bud build`, {
          cwd: ex.cwd,
        })
        await build
      } catch (err) {
        console.log(err)
      }

      return ex
    }),
  )

  global.examples = examples
}
