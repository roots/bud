import type CreateCommand from '../commands/create.js'
import formatSource from '../utilities/formatSource.js'

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
    const extensions = [`@roots/eslint-config`]

    command.support.includes(`babel`) &&
      extensions.push(`@roots/eslint-config/babel`)

    command.support.includes(`typescript`) &&
      extensions.push(`@roots/eslint-config/typescript`)

    command.support.includes(`react`) &&
      extensions.push(`@roots/eslint-config/react`)

    command.support.includes(`wordpress`) &&
      extensions.push(`@roots/eslint-config/wordpress`)

    await command.fs.write(
      `eslint.config.js`,
      formatSource(
        `export default {
        root: true,
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
