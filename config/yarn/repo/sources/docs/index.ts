import {CommandClass, Option} from 'clipanion'

import {Command} from '../Command'

export class MdCommand extends Command {
  public static paths: CommandClass['paths'] = [[`repo`, `docs`]]

  public static usage: CommandClass['usage'] = {
    category: `repo`,
    description: `build docs and readme files. no flags builds everything. running with the --site flag will also build api docs.`,
    examples: [
      [`build all`, `yarn repo docs`],
      [`build api documentation`, `yarn repo docs --api`],
      [
        `build api documentation and site files`,
        `yarn repo docs --site`,
      ],
      [`build readme files`, `yarn docs --readme`],
    ],
  }

  public api = Option.Boolean(`-a,--api`, false, {
    description: `build api docs`,
  })
  public site = Option.Boolean(`-s,--site`, false, {
    description: `build site files`,
  })
  public readme = Option.Boolean(`-r,--readme`, false, {
    description: `build readme files`,
  })

  /**
   * Execute command
   *
   * @public
   */
  public async execute() {
    const all = !this.site && !this.readme && !this.api

    if (this.api || this.site || all) {
      await this.$(`yarn node ./site/api-documenter.build.js`)
    }

    await this.$(
      ...[
        this.site || all
          ? `yarn workspace @roots/bud-docs run docusaurus build`
          : null,
        this.readme || all
          ? `yarn ts-node-transpile-only --project ./config/tsconfig.json ./dev/readme`
          : null,
      ].filter(Boolean),
    )
  }
}
