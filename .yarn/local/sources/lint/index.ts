import {Command} from '../Command'
import {Option} from 'clipanion'

export class LintCommand extends Command {
  static paths = [[`kjo`, `lint`]]

  public prettier = Option.Boolean(`-p,--prettier`, false)
  public eslint = Option.Boolean(`-e,--eslint`, false)
  public skypack = Option.Boolean(`-s,--skypack`, false)

  public commands = {
    eslint: [
      `yarn eslint packages/**/src/**/*.{js,jsx,ts,tsx} --fix`,
      `yarn eslint dev/**/*.{js,jsx,ts,tsx} --fix`,
      `yarn eslint site/**/*.{js,jsx,ts,tsx} --fix`,
    ],
    prettier: [
      `yarn prettier packages/**/src/**/*.{ts,js,tsx,jsx} --fix --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
      `yarn prettier dev/**/*.{ts,js,tsx,jsx} --fix --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
      `yarn prettier site/**/*.{ts,js,tsx,jsx,md,mdx} --fix --ignore-unknown --loglevel silent --no-error-on-unmatched-pattern`,
    ],
    skypack: [
      `yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run pkg`,
    ],
  }

  async execute() {
    const itinerary = []

    if (this.eslint)
      itinerary.push(Object.values(this.commands.eslint))

    if (this.prettier)
      itinerary.push(Object.values(this.commands.prettier))

    if (this.skypack)
      itinerary.push(Object.values(this.commands.skypack))

    if (!this.eslint && !this.prettier && !this.skypack)
      itinerary.push(
        Object.values(this.commands).reduce((a, v) => [
          ...a,
          ...v,
        ]),
        [],
      )

    await this.$(itinerary)
  }
}
