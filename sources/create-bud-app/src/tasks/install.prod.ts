/* eslint-disable no-console */
import type CreateCommand from '../commands/create.js'

export default async function installTask(command: CreateCommand) {
  const spinner = command.createSpinner()
  spinner.start(`Installing runtime dependencies...`)

  if (!command.dependencies?.length) {
    return spinner.succeed(`No runtime dependencies to install.`)
  }

  try {
    switch (command.packageManager) {
      case `pnpm`:
        await command.sh(`pnpm`, [`install`, ...command.dependencies, `--public-hoist-pattern="*"`])
        break

      case `npm`:
        await command.sh(`npm`, [`install`, ...command.dependencies])
        break

      case `yarn classic`:
        await command.sh(`yarn`, [`add`, ...command.dependencies])
        break

      case `yarn`:
        await command.sh(`yarn`, [`add`, ...command.dependencies])
        break
    }
  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}
