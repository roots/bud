import type CreateCommand from '../commands/create.js'

export default async function writeYarnLockfile(command: CreateCommand) {
  if (![`yarn classic`, `yarn`].includes(command.packageManager)) return

  const spinner = command.createSpinner()
  spinner.start(`Writing yarn.lock...`)

  if (!command.overwrite && command.exists(`yarn.lock`)) {
    return spinner.warn(`yarn.lock already exists. skipping write task.`)
  }

  await command.fs.write(`yarn.lock`, ``).catch(error => {
    spinner.fail()
    throw error
  })

  spinner.succeed()
}
