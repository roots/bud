import type CreateCommand from '../commands/create.js'

export default async function buildTask(command: CreateCommand) {
  const spinner = command.createSpinner()
  spinner.start(`Building project...`)

  try {
    switch (command.packageManager) {
      case `npm`:
        await command.sh(`npx`, [`bud`, `build`, `production`])
        break

      case `yarn`:
        await command.sh(`yarn`, [`bud`, `build`, `production`])
        break
    }
  } catch (error) {
    spinner.fail()
    command.context.stderr.write(`\n`)
    throw error
  }

  spinner.succeed()
}
