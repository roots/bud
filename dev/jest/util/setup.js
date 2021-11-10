/* eslint-disable no-console */
// @ts-check

const chalk = require('chalk')
const fs = require('fs-extra')
const execa = require('execa')

const clearArtifacts = require('./clearArtifacts')
const paths = require('./paths')

// const clearArtifacts = require('./clearArtifacts')

const task = async (cmd, paths) => {
  console.log(chalk.blue`\nyarn bud ${cmd} \n`)

  await Promise.all(
    paths.map(async ex => {
      const task = execa.command(`yarn bud ${cmd} --flush`, {
        cwd: ex.cwd,
      })

      task
        .then(() => console.log(chalk.green`${ex.name}`))
        .catch(async err => {
          await fs.writeFile(
            ex.cwd.concat(`/err.${cmd}.log`),
            err.stdout,
          )
          console.log(chalk.red`${ex.name}`)
        })
        .finally(() => {
          const killed = task.kill()

          killed &&
            console.log(`${ex.name} yarn bud ${cmd} killed`)
        })

      await task
    }),
  )
}

module.exports = async () => {
  await clearArtifacts()

  const examples = await paths()

  await task('build', examples)
}
