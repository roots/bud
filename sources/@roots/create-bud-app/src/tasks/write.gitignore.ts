import type CreateCommand from '../commands/create.js'

export default async function writeGitignoreConfigTask(
  command: CreateCommand,
) {
  const spinner = command.createSpinner()
  spinner.start(`Writing gitignore...`)

  if (!command.overwrite && command.exists(`gitignore`)) {
    return spinner.warn(`gitignore already exists. skipping write task.`)
  }

  try {
    await command.fs.write(
      `.gitignore`,
      `\
dist
node_modules
  `,
    )
  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}
