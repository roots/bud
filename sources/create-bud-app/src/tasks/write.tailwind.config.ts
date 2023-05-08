import {join} from 'node:path'

import type CreateCommand from '../commands/create.js'
import templateEngine from '../utilities/templateEngine.js'

export default async function writePackageManifest(
  command: CreateCommand,
) {
  if (!command.support.includes(`tailwindcss`)) return

  const spinner = command.createSpinner()
  spinner.start(`Writing tailwind config...`)

  if (!command.overwrite && command.exists(`tailwind`)) {
    return spinner.warn(
      `tailwind config already exists. skipping write task.`,
    )
  }

  try {
    const source = await command.fs.read(
      join(
        command.createRoot,
        `templates`,
        `default`,
        `tailwind.config.ts`,
      ),
      `utf8`,
    )

    const template = templateEngine.compile(source)

    const result = template({
      name: command.name,
      username: command.username,
      license: command.license,
      version: command.version,
    })

    await command.fs.write(`tailwind.config.ts`, result)
  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}
