import {Command} from '../Command'
import {Option} from 'clipanion'

export class LintCommand extends Command {
  static paths = [[`kjo`, `lint`]]

  public all = Option.Boolean(`-a,--all`, false)
  public prettier = Option.Boolean(`-p,--prettier`, false)
  public eslint = Option.Boolean(`-e,--eslint`, false)
  public skypack = Option.Boolean(`-s,--skypack`, false)

  async execute() {
    const all =
      (!this.prettier && !this.skypack && !this.eslint) ||
      this.all

    if (this.eslint || all) {
      await this.$(
        `yarn eslint packages/**/src/**/*.{js,jsx,ts,tsx} --fix`,
      )

      await this.$(`yarn eslint dev/**/*.{js,jsx,ts,tsx} --fix`)
    }

    if (this.prettier || all) {
      await this.$(
        `yarn prettier packages/**/src/**/*.{ts,js,tsx,jsx} --fix --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
      )

      await this.$(
        `yarn prettier dev/**/*.{ts,js,tsx,jsx} --fix --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
      )

      await this.$(
        `yarn prettier site/**/*.{ts,js,tsx,jsx,md,mdx} --fix --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
      )
    }

    if (this.skypack || all) {
      await this.$(
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run pkg`,
      )
    }
  }
}
