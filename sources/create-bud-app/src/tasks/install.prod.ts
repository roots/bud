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
        await command.sh(`pnpm`, [
          `add`,
          ...command.dependencies,
        ])
        await command.sh(`pnpm`, [`install`, `--shamefully-hoist`])
        break

      case `npm`:
        await command.sh(`npm`, [`install`, ...command.dependencies])
        break

      default:
        await command.sh(`yarn`, [`add`, ...command.dependencies])
        break
    }
  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}
