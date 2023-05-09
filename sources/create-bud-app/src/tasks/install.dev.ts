/* eslint-disable no-console */
import type CreateCommand from '../commands/create.js'

export default async function installTask(command: CreateCommand) {
  const spinner = command.createSpinner()
  spinner.start(`Installing development dependencies...`)

  try {
    const formatSignifier = createSignifierFormatter(command)

    const dependencies = new Set([
      ...command.support.map(formatSignifier).filter(Boolean),
      ...command.devDependencies.map(formatSignifier).filter(Boolean),
    ])

    switch (command.packageManager) {
      case `npm`:
        await command.sh(`npm`, [`install`, ...dependencies, `--save-dev`])
        break

      case `yarn`:
        await command.sh(`yarn`, [`add`, ...dependencies, `--dev`])
        break
    }
  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}

function createSignifierFormatter(
  command: CreateCommand,
): (key: string) => string {
  return (key: string) => {
    if (key.startsWith(`@roots`) && !key.split(`/`).pop().includes(`@`)) {
      return `${key}@${command.version}`
    }
    if (command.extensions[key]) {
      return `${command.extensions[key]}@${command.version}`
    }
    return key
  }
}
