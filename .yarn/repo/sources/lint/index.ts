import {Command} from '../Command'
import {CommandClass, Option} from 'clipanion'

export class LintCommand extends Command {
  static paths: CommandClass['paths'] = [[`repo`, `lint`]]
  static usage: CommandClass['usage'] = {
    category: `repo`,
    description: `lint repo files. run all linters by passing no flags.`,
    examples: [
      [`run all linters`, `yarn repo lint`],
      [`run prettier`, `yarn repo lint --prettier`],
      [`run eslint`, `yarn repo lint --eslint`],
      [`run skypack`, `yarn repo lint --skypack`],
      [
        `lint on type definitions as well`,
        `yarn repo lint --types`,
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

  async execute() {
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
              `yarn eslint packages/@roots/*/src/**/*.{js,jsx,ts,tsx} --fix`,
              `yarn eslint dev/**/*.{js,jsx,ts,tsx} --fix`,
              `yarn eslint site/src/**/*.{js,jsx,ts,tsx} --fix`,
            ]
          : []),
        ...(this.prettier
          ? [
              `yarn prettier packages/@roots/*/src/**/* --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
              this.lib
                ? `yarn prettier packages/@roots/*/lib/**/* --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`
                : ``,
              this.types
                ? `yarn prettier packages/@roots/*/types/**/*.d.ts --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`
                : null,
              `yarn prettier site/src/**/*.{js,ts} --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
              `yarn prettier site/{blog,docs,extensions,guides,i18n,pages,recipes,releases,sidebars}/*.mdx --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
            ].filter(Boolean)
          : []),
        this.skypack
          ? `yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run pkg`
          : null,
      ].filter(Boolean),
    )
  }
}
