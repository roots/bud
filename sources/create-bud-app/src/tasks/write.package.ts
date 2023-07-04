import {join} from 'node:path'

import type CreateCommand from '../commands/create.js'

import templateEngine from '../utilities/templateEngine.js'

export default async function writePackageManifest(
  command: CreateCommand,
) {
  const spinner = command.createSpinner()
  spinner.start(`Writing package.json...`)

  if (!command.overwrite && command.exists(`package`)) {
    return spinner.warn(
      `package.json already exists. skipping write task.`,
    )
  }

  try {
    const source = await command.fs.read(
      join(command.createRoot, `templates`, `package.json.hbs`),
      `utf8`,
    )

    const template = templateEngine.compile(source)

    const result = template({
      description: command.description,
      license: command.license,
      name: command.name,
      username: command.username,
      version: command.version,
    })

    await command.fs.write(`package.json`, result)
  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}
