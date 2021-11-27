import {Command} from '../Command'
import {Option} from 'clipanion'

export class MdCommand extends Command {
  static paths = [[`repo`, `docs`]]
  static usage = {
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

  public api = Option.Boolean(
    `-a,--api`,
    false,
    `build api docs`,
  )

  public site = Option.Boolean(
    `-s,--site`,
    false,
    `build site files`,
  )

  public readme = Option.Boolean(
    `-r,--readme`,
    false,
    `build readme files`,
  )

  async execute() {
    if (!this.site && !this.readme && !this.docs) {
      await this.$(`yarn node ./site/api-documenter.build.js`)

      await this.$(
        `yarn workspace @roots/bud-docs run docusaurus build`,
        `yarn ts-node-transpile-only ./dev/readme`,
      )
    }

    if (this.docs || this.site) {
      await this.$(`yarn node ./site/api-documenter.build.js`)
    }

    await this.$(
      ...[
        this.site
          ? `yarn workspace @roots/bud-docs run docusaurus build`
          : null,
        this.readme
          ? `yarn ts-node-transpile-only ./dev/readme`
          : null,
      ].filter(Boolean),
    )
  }
}
