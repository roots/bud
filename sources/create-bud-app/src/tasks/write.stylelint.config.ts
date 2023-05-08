import {join} from 'node:path'

import type CreateCommand from '../commands/create.js'
import formatSource from '../utilities/formatSource.js'
import templateEngine from '../utilities/templateEngine.js'

export default async function writeStylelintConfigTask(
  command: CreateCommand,
) {
  if (!command.support.includes(`stylelint`)) return

  const spinner = command.createSpinner()
  spinner.start(`Writing stylelint config...`)

  if (!command.overwrite && command.exists(`stylelint`)) {
    return spinner.warn(
      `stylelint config already exists. skipping write task.`,
    )
  }

  try {
    const configExtends = [`@roots/bud-stylelint/config`]

    command.support.includes(`sass`) &&
      configExtends.push(`@roots/bud-sass/stylelint-config`)

    if (command.support.includes(`tailwindcss`)) {
      !command.support.includes(`sass`)
        ? configExtends.push(`@roots/bud-tailwindcss/stylelint-config`)
        : configExtends.push(
            `@roots/bud-tailwindcss/stylelint-config/scss`,
          )
    }

    command.support.includes(`wordpress`) &&
      configExtends.push(`@roots/bud-preset-wordpress/stylelint-config`)

    const source = await command.fs.read(
      join(command.createRoot, `templates`, `stylelint.config.cjs.hbs`),
      `utf8`,
    )

    const template = templateEngine.compile(source)

    const result = template({extends: configExtends})

    await command.fs.write(`stylelint.config.cjs`, formatSource(result))
  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}
