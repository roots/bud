/* eslint-disable no-console */
import type CreateCommand from '../commands/create.js'

export default async function installTask(command: CreateCommand) {
  const spinner = command.createSpinner()
  spinner.start(`Installing development dependencies...`)

  try {
    const dependencies = new Set([
      `@roots/bud`,
      ...command.devDependencies.filter(Boolean),
    ])

    switch (command.packageManager) {
      case `pnpm`:
        await command.sh(`pnpm`, [`add`, ...dependencies, `--save-dev`])
        await command.sh(`pnpm`, [
          `install`,
          `--shamefully-hoist`,
        ])
        break

      case `npm`:
        await command.sh(`npm`, [`install`, ...dependencies, `--save-dev`])
        break

      default:
        await command.sh(`yarn`, [`add`, ...dependencies, `--dev`])
        break
    }

    spinner.succeed()
  } catch (error) {
    spinner.fail()
    throw error
  }
}
