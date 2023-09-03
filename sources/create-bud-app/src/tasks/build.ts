import type CreateCommand from '../commands/create.js'

export default async function buildTask(command: CreateCommand) {
  const spinner = command.createSpinner()
  spinner.start(`Building project...`)

  try {
    switch (command.packageManager) {
      case `pnpm`:
        await command.sh(`pnpm`, [`bud`, `build`, `--force`, `--no-cache`])
        break

      case `npm`:
        await command.sh(`npx`, [`bud`, `build`, `--force`, `--no-cache`])
        break

      default:
        await command.sh(`yarn`, [`bud`, `build`, `--force`, `--no-cache`])
        break
    }
  } catch (error) {
    spinner.fail()
    command.context.stderr.write(`\n`)
    throw error
  }

  spinner.succeed()
}
