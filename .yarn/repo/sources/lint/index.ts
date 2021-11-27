import {Command} from '../Command'
import {Option} from 'clipanion'

export class LintCommand extends Command {
  static paths = [[`repo`, `lint`]]
  static usage = {
    category: `repo`,
    description: `lint repo files. run all linters by passing no flags.`,
    examples: [
      [`run all linters`, `yarn repo lint`],
      [`run prettier`, `yarn repo lint --prettier`],
      [`run eslint`, `yarn repo lint --eslint`],
      [`run skypack`, `yarn repo lint --skypack`],
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

  async execute() {
    const all = !this.prettier && !this.skypack && !this.eslint

    if (all) {
      this.prettier = true
      this.skypack = true
      this.eslint = true
    }

    if (all) {
      await this.$(
        `yarn eslint packages/@roots/*/src/**/*.{js,jsx,ts,tsx} --fix`,
        `yarn eslint dev/**/*.{js,jsx,ts,tsx} --fix`,
        `yarn prettier packages/@roots/*/{src,types,lib}/**/*.{ts,js,tsx,jsx} --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
        `yarn prettier {dev,site}/**/*.{ts,js,tsx,jsx} --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run pkg`,
      )
    }

    await this.$(
      ...(this.eslint
        ? [
            `yarn eslint packages/@roots/*/src/**/*.{js,jsx,ts,tsx} --fix`,
            `yarn eslint dev/**/*.{js,jsx,ts,tsx} --fix`,
          ]
        : []),
      ...(this.prettier
        ? [
            `yarn prettier packages/@roots/*/{src,types,lib}/**/*.{ts,js,tsx,jsx} --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
            `yarn prettier {dev,site}/**/*.{ts,js,tsx,jsx} --write --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
          ]
        : []),
      this.skypack
        ? `yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run pkg`
        : null,
    )
  }
}
