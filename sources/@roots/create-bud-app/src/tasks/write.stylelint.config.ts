import type CreateCommand from '../commands/create.js'
import formatSource from '../utilities/formatSource.js'

export default async function writeStylelintConfigTask(
  command: CreateCommand,
) {
  const spinner = command.createSpinner()
  spinner.start(`Writing stylelint.config.js...`)

  if (!command.overwrite && command.exists(`stylelint`)) {
    return spinner.warn(
      `stylelint config already exists. skipping write task.`,
    )
  }

  try {
    const extensions = [`@roots/bud-stylelint/config`]

    command.support.includes(`sass`) &&
      extensions.push(`@roots/bud-sass/stylelint-config`)

    if (command.support.includes(`tailwindcss`)) {
      !command.support.includes(`sass`)
        ? extensions.push(`@roots/bud-tailwindcss/stylelint-config`)
        : extensions.push(`@roots/bud-tailwindcss/stylelint-config/sass`)
    }

    command.support.includes(`wordpress`) &&
      extensions.push(`@roots/bud-preset-wordpress/stylelint-config`)

    await command.fs.write(
      `stylelint.config.cjs`,
      formatSource(
        `module.exports = {
        extends: ${JSON.stringify(extensions, null, 2)}
      }`,
      ),
    )
  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}
