/* eslint-disable no-console */
import type CreateCommand from '../commands/create.js'

export default async function installTask(command: CreateCommand) {
  process.stdout.write(`Installing runtime dependencies... \n`)

  switch (command.packageManager) {
    case `npm`:
      await command.sh(`npm`, [`install`, ...command.dependencies])
      break

    case `yarn`:
      await command.sh(`yarn`, [`add`, ...command.dependencies])
      break
  }
}
