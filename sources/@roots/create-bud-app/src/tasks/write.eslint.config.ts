import type CreateCommand from '../commands/create.js'
import formatSource from '../utilities/formatSource.js'

export default async function writeStylelintConfigTask(
  command: CreateCommand,
) {
  const spinner = command.createSpinner()
  spinner.start(`Writing eslint.config.js...`)

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

  spinner.succeed()
}
