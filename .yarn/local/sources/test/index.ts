import {Command} from '../Command'
import {Option} from 'clipanion'

export class TestCommand extends Command {
  static paths = [[`kjo`, `test`]]

  public all = Option.Boolean(`-a,--all`, false)
  public unit = Option.Boolean(`-u,--unit`, false)
  public integration = Option.Boolean(`-i,--integration`, false)
  public workers = Option.String(`-w,--workers`, '50%')

  async execute() {
    const all = (!this.unit && !this.integration) || this.all

    if (this.unit || all)
      await this.$(
        `yarn jest --coverage --testPathIgnorePatterns="tests/integration" --testPathIgnorePatterns="tests/util" --maxWorkers=${this.workers}`,
      )

    if (this.integration || all)
      await this.$(`node ./jest.integration.js`)
  }
}
