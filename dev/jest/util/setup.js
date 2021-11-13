/* eslint-disable no-console */
// @ts-check

const chalk = require('chalk')
const execa = require('execa')

const clearArtifacts = require('./clearArtifacts')
const paths = require('./paths')

const task = async (cmd, paths) => {
  console.log(chalk.blue`\nyarn bud ${cmd}\n`)

  await Promise.all(
    paths.map(async ex => {
      const task = execa.command(`yarn bud ${cmd}`, {
        cwd: ex.cwd,
      })
      task.stdout.pipe(process.stdout)
      await task
    }),
  )
}

module.exports = async () => {
  await clearArtifacts()

  const examples = await paths()

  await task('build --no-dashboard', examples)
}
