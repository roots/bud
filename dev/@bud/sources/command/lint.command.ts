import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Lint extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `lint`]]
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `lint repo files. run all linters by passing no flags.`,
    examples: [
      [`run all linters`, `yarn @bud lint`],
      [`run prettier`, `yarn @bud lint --prettier`],
      [`run eslint`, `yarn @bud lint --eslint`],
      [`run skypack`, `yarn @bud lint --skypack`],
      [
        `lint on type definitions as well`,
        `yarn @bud lint --types`,
      ],
    ],
  }

  public prettier = Option.Boolean(`-p,--prettier`, false, {
    description: 'run prettier',
  })
  public eslint = Option.Boolean(`-e,--eslint`, false, {
    description: 'run eslint',
  })
  public skypack = Option.Boolean(`-s,--skypack`, false, {
    description: 'run skypack',
  })
  public types = Option.Boolean(`-t,--types`, false, {
    description: 'includes types (prettier)',
  })
  public lib = Option.Boolean(`-l,--lib`, false, {
    description: 'includes lib (prettier)',
  })

  public async execute() {
    const all = !this.prettier && !this.skypack && !this.eslint

    if (all) {
      this.prettier = true
      this.skypack = true
      this.eslint = true
    }

    await this.$(
      ...[
        ...(this.eslint
          ? [
              `yarn eslint ./packages/@roots/*/src/**/*.{js,jsx,ts,tsx} --config ./config/.eslintrc.js --ignore-path ./config/.eslintignore --fix`,
              `yarn eslint ./dev/**/*.{js,jsx,ts,tsx} --config ./config/.eslintrc.js --ignore-path ./config/.eslintignore  --fix`,
              `yarn eslint ./site/src/**/*.{js,jsx,ts,tsx} --config ./config/.eslintrc.js --ignore-path ./config/.eslintignore  --fix`,
            ]
          : []),
        ...(this.prettier
          ? [
              `yarn prettier ./packages/@roots/*/src/**/* --config ./config/prettier.config.js --ignore-path ./config/.prettierignore --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
              this.lib
                ? `yarn prettier ./packages/@roots/*/lib/**/* --config ./config/prettier.config.js  --ignore-path ./config/.prettierignore --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`
                : ``,
              this.types
                ? `yarn prettier ./packages/@roots/*/types/**/*.d.ts --config ./config/prettier.config.js --ignore-path ./config/.prettierignore --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`
                : null,
            ].filter(Boolean)
          : []),
        this.skypack
          ? `yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run pkg`
          : null,
      ].filter(Boolean),
    )
  }
}
