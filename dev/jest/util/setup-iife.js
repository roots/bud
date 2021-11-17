/* eslint-disable no-console */
// @ts-check

const execa = require('execa')
const {Signale} = require('signale')

const clearArtifacts = require('./clearArtifacts')
const paths = require('./paths')

const task = async (cmd, paths) => {
  await Promise.all(
    paths.map(async ex => {
      const logger = new Signale()

      const task = execa.command(`yarn bud ${cmd}`, {
        cwd: ex.cwd,
      })

      task.stdout?.on('data', message => {
        logger.log({
          message: message.toString(),
          prefix: ex.name,
        })
      })

      task.stdout?.on('error', message => {
        logger.log({
          message: message.toString(),
          prefix: ex.name,
        })
      })

      await task
    }),
  )
}

;(async () => {
  await clearArtifacts()

  const examples = await paths()

  await task(
    'build --no-dashboard --log --log.papertrail --flush',
    examples,
  )
})()
