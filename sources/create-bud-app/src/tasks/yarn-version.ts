/* eslint-disable no-console */
import type CreateCommand from '../commands/create.js'

export default async function yarnVersionTask(command: CreateCommand) {
  if (![`yarn classic`, `yarn`].includes(command.packageManager)) return

  const spinner = command.createSpinner()
  spinner.start(`Setting yarn version`)

  await command.sh(`yarn`, [`set`, `version`, command.packageManager === `yarn` ? `berry` : `classic`])

  try {

  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}
