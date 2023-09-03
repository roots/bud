import {join} from 'node:path'

import type CreateCommand from '../commands/create.js'

import templateEngine from '../utilities/templateEngine.js'

export default async function writeTypes(
  command: CreateCommand,
) {
  const spinner = command.createSpinner()
  spinner.start(`Writing types.d.ts...`)

  if (!command.overwrite && command.exists(`types.d.ts`)) {
    return spinner.warn(`types.d.ts already exists. skipping write task.`)
  }

  try {
    const source = await command.fs.read(
      join(command.createRoot, `templates`, `types.d.hbs`),
      `utf8`,
    )

    const template = templateEngine.compile(source)

    const result = template({})

    await command.fs.write(`types.d.ts`, result)
  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}
