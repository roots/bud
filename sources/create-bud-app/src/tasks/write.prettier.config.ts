import {join} from 'node:path'

import type CreateCommand from '../commands/create.js'

import formatSource from '../utilities/formatSource.js'
import templateEngine from '../utilities/templateEngine.js'

export default async function writeStylelintConfigTask(
  command: CreateCommand,
) {
  if (!command.support.includes(`prettier`)) return

  const spinner = command.createSpinner()
  spinner.start(`Writing prettier config...`)

  if (!command.overwrite && command.exists(`prettier`)) {
    return spinner.warn(
      `prettier config already exists. skipping write task.`,
    )
  }

  const source = await command.fs.read(
    join(command.createRoot, `templates`, `prettier.config.js.hbs`),
    `utf8`,
  )

  const template = templateEngine.compile(source)

  const result = template({})

  try {
    await command.fs.write(`.prettierrc.cjs`, formatSource(result))
  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}
