import type CreateCommand from '../commands/create.js'
import formatSource from '../utilities/formatSource.js'

export default async function writeStylelintConfigTask(
  command: CreateCommand,
) {
  if (!command.support.includes(`prettier`)) return

  const spinner = command.createSpinner()
  spinner.start(`Writing prettier.config.cjs...`)

  if (!command.overwrite && command.exists(`prettier`)) {
    return spinner.warn(
      `prettier config already exists. skipping write task.`,
    )
  }

  try {
    await command.fs.write(
      `.prettierrc.cjs`,
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
  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}
