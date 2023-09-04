import {join} from 'node:path'

import type CreateCommand from '../commands/create.js'

import hbs from '../utilities/templateEngine.js'

export default async function writeYarnRC(
  command: CreateCommand,
) {
  if (command.packageManager !== `yarn`) return

  const spinner = command.createSpinner()
  spinner.start(`Writing .yarnrc.yml...`)

  if (!command.overwrite && command.exists(`.yarnrc`)) {
    return spinner.warn(
      `.yarnrc.yml already exists. skipping write task.`,
    )
  }

  try {
    const source = await command.fs.read(
      join(command.createRoot, `templates`, `.yarnrc.yml.hbs`),
      `utf8`,
    )

    await command.fs.write(`.yarnrc.yml`, hbs.compile(source)({}))
  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}
