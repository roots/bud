/* eslint-disable no-console */
import type CreateCommand from '../commands/create.js'

export default async function installTask(command: CreateCommand) {
  const spinner = command.createSpinner()
  spinner.start(`Installing runtime dependencies...`)

  switch (command.packageManager) {
    case `npm`:
      await command.sh(`npm`, [`install`, ...command.dependencies])
      break

    case `yarn`:
      await command.sh(`yarn`, [`add`, ...command.dependencies])
      break
  }

  spinner.succeed()
}
