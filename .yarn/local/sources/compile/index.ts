import {Command} from '../Command'
import {Option} from 'clipanion'

export class CompileCommand extends Command {
  static paths = [[`kjo`, `compile`]]

  public package = Option.String()

  async execute() {
    await this.$(
      `yarn ts-node ./dev/tasks/compile/cjs ${this.package}`,
    )

    await this.$(
      `yarn ts-node ./dev/tasks/compile/esm ${this.package}`,
    )
  }
}
