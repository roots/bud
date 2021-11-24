import {Command} from '../Command'
import {Option} from 'clipanion'

export class MdCommand extends Command {
  static paths = [[`kjo`, `md`]]

  public site = Option.Boolean(`-s,--site`, false)
  public readme = Option.Boolean(`-r,--readme`, false)

  async execute() {
    const all = !this.site && !this.readme

    if (this.site || all)
      await this.$(
        `yarn workspace @roots/bud-docs run docusaurus build`,
      )

    if (this.readme || all)
      await this.$(`yarn ts-node-transpile-only ./dev/readme`)
  }
}
