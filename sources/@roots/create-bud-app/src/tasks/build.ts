import type CreateCommand from '../commands/create.js'

export default async function buildTask(command: CreateCommand) {
  process.stdout.write(`Building project... \n`)

  switch (command.packageManager) {
    case `npm`:
      await command.sh(`npx`, [`bud`, `build`, `production`])
      break

    case `yarn`:
      await command.sh(`yarn`, [`bud`, `build`, `production`])
      break
  }
}
