import type CreateCommand from '../commands/create.js'

export default async function writeGitignoreConfigTask(
  command: CreateCommand,
) {
  const spinner = command.createSpinner()
  spinner.start(`Writing .gitignore...`)

  await command.fs.write(
    `.gitignore`,
    `\
dist
node_modules
  `,
  )

  spinner.succeed()
}
