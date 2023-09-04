import type CreateCommand from '../commands/create.js'

import formatSource from '../utilities/formatSource.js'

export default async function writeTsConfig(command: CreateCommand) {
  const spinner = command.createSpinner()
  spinner.start(`Writing tsconfig...`)

  if (!command.overwrite && command.exists(`tsconfig`, `jsconfig`)) {
    return spinner.warn(
      `tsconfig or jsconfig already exists. skipping write task.`,
    )
  }

  try {
    const types = [`@roots/bud`]

    command.support.includes(`babel`) && types.push(`@roots/bud-babel`)
    command.support.includes(`swc`) && types.push(`@roots/bud-swc`)
    command.support.includes(`typescript`) &&
      types.push(`@roots/bud-typescript`)
    command.support.includes(`sass`) && types.push(`@roots/bud-sass`)
    command.support.includes(`tailwindcss`) &&
      types.push(`@roots/bud-tailwindcss`)
    command.support.includes(`postcss`) && types.push(`@roots/bud-postcss`)
    command.support.includes(`vue`) && types.push(`@roots/bud-vue`)
    command.support.includes(`react`) && types.push(`@roots/bud-react`)
    command.support.includes(`eslint`) && types.push(`@roots/bud-eslint`)
    command.support.includes(`stylelint`) && types.push(`@roots/stylelint`)
    command.support.includes(`wordpress`) &&
      types.push(
        `@roots/bud-preset-wordpress`,
        `@roots/bud-wordpress-dependencies`,
        `@roots/bud-wordpress-externals`,
        `@roots/bud-wordpress-manifests`,
      )

    types.push(`webpack/module`)

    const source = `{
      "extends": ["@roots/bud/config/tsconfig.json"],
      "compilerOptions": {
        "allowJs": true,
        "paths": {
          "@src/*": ["./src/*"]
        },
        "types": [${types.reduce((all, type) => `${all} "${type}",`, ``)}]
      },
      "files": ["./bud.config.ts", "./types.d.ts"],
      "include": ["./src"],
      "exclude": ["./node_modules", "./dist"]
    }
    `

    await command.fs.write(
      `tsconfig.json`,
      await formatSource(source, {parser: `json`}),
    )
  } catch (error) {
    spinner.fail()
    throw error
  }

  spinner.succeed()
}
