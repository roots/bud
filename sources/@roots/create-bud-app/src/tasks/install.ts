/* eslint-disable no-console */
import type CreateCommand from '../commands/create.js'

export default async function installTask(command: CreateCommand) {
  process.stdout.write(`Installing dev dependencies... \n`)

  switch (command.packageManager) {
    case `npm`:
      await command.sh(`npm`, [
        `install`,
        ...command.support.map(mapVersion(command.version)),
        `--save-dev`,
      ])

      break

    case `yarn`:
      await command.sh(`yarn`, [
        `add`,
        ...command.support.map(mapVersion(command.version)),
        `--dev`,
      ])

      break
  }
}

function mapVersion(version: string): (signifier: string) => string {
  return (signifier: string) => {
    return signifier.startsWith(`@roots`) && !signifier.includes(`@`)
      ? `${signifier}@${version}`
      : signifier
  }
}
