/* eslint-disable no-console */
import type CreateCommand from '../commands/create.js'

export default async function installTask(command: CreateCommand) {
  process.stdout.write(`Installing dev dependencies... \n`)

  switch (command.packageManager) {
    case `npm`:
      await command.sh(`npm`, [
        `install`,
        ...new Set(
          command.support.map(mapVersion(command)).filter(Boolean),
        ),
        `--save-dev`,
      ])

      break

    case `yarn`:
      await command.sh(`yarn`, [
        `add`,
        ...new Set(
          command.support.map(mapVersion(command)).filter(Boolean),
        ),
        `--dev`,
      ])

      break
  }
}

function mapVersion(command: CreateCommand): (key: string) => string {
  return (key: string) => {
    return command.extensions[key]
      ? `${command.extensions[key]}@${command.version}`
      : key
  }
}
