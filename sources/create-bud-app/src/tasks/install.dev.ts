/* eslint-disable no-console */
import type CreateCommand from '../commands/create.js'

export default async function installTask(command: CreateCommand) {
  const spinner = command.createSpinner()
  spinner.start(`Installing development dependencies...`)

  try {
    const formatSignifier = createSignifierFormatter(command)

    const dependencies = new Set([
      `@roots/bud`,
      ...command.support.map(formatSignifier).filter(Boolean),
      ...command.devDependencies.map(formatSignifier).filter(Boolean),
    ])

    switch (command.packageManager) {
      case `pnpm`:
        await command.sh(`pnpm`, [`install`, ...dependencies, `--save-dev`, `--public-hoist-pattern="*"`])
        break

      case `npm`:
        await command.sh(`npm`, [`install`, ...dependencies, `--save-dev`])
        break

      case `yarn classic`:
         await command.sh(`yarn`, [`add`, ...dependencies, `--dev`])
        break

      case `yarn`:
        await command.sh(`yarn`, [`add`, ...dependencies, `--dev`])
        break
    }

    spinner.succeed()
  } catch (error) {
    spinner.fail()
    throw error
  }
}

function createSignifierFormatter(
  command: CreateCommand,
): (key: string) => string {
  return (key: string) => {
    if (
      key?.startsWith(`@roots`) &&
      !key.split(`/`).pop()?.includes(`@`)
    ) {
      return `${key}@${command.version}`
    }
    if (command.extensions[key]) {
      return `${command.extensions[key]}@${command.version}`
    }
    return key
  }
}
