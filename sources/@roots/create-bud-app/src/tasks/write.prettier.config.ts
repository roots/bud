import type CreateCommand from '../commands/create.js'
import formatSource from '../utilities/formatSource.js'

export default async function writeStylelintConfigTask(
  command: CreateCommand,
) {
  const spinner = command.createSpinner()
  spinner.start(`Writing eslint.config.js...`)

  const extensions = [`@roots/bud-eslint/config`]

  command.support.includes(`sass`) &&
    extensions.push(`@roots/bud-sass/eslint-config`)

  command.support.includes(`tailwindcss`) &&
    extensions.push(`@roots/bud-tailwindcss/eslint-config`)

  await command.fs.write(
    `prettier.config.cjs`,
    formatSource(
      `module.exports = {
        bracketSpacing: false,
        tabWidth: 2,
        printWidth: 75,
        singleQuote: true,
        useTabs: false,
        trailingComma: 'all',
        overrides: [
          {
            files: '*.d.ts',
            options: {
              parser: 'typescript',
            },
          },
        ],
      }`,
    ),
  )

  spinner.succeed()
}
