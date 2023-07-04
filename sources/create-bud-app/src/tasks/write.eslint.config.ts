import {join} from 'path'

import type CreateCommand from '../commands/create.js'

import formatSource from '../utilities/formatSource.js'
import templateEngine from '../utilities/templateEngine.js'

export default async function writeStylelintConfigTask(
  command: CreateCommand,
) {
  if (!command.support.includes(`eslint`)) return

  const spinner = command.createSpinner()
  spinner.start(`Writing eslint config...`)

  if (!command.overwrite && command.exists(`eslint`)) {
    return spinner.warn(
      `eslint config already exists. skipping write task.`,
    )
  }

  try {
    const configExtends = [`@roots/eslint-config`]

    /** babel syntax */
    command.support.includes(`babel`) &&
      configExtends.push(`@roots/eslint-config/babel`)

    /** ts syntax */
    ;(command.support.includes(`typescript`) ||
      command.support.includes(`swc`)) &&
      configExtends.push(`@roots/eslint-config/typescript`)

    /** react syntax */
    command.support.includes(`react`) &&
      configExtends.push(`@roots/eslint-config/react`)

    /** wordpress rules */
    command.support.includes(`wordpress`) &&
      configExtends.push(`@roots/eslint-config/wordpress`)

    const source = await command.fs.read(
      join(command.createRoot, `templates`, `eslint.config.js.hbs`),
      `utf8`,
    )

    const template = templateEngine.compile(source)

    const result = template({extends: configExtends})

    await command.fs.write(`eslint.config.js`, formatSource(result))
  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}
