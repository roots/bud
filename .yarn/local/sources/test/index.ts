import {Command} from '../Command'
import {Option} from 'clipanion'

export class TestCommand extends Command {
  static paths = [[`kjo`, `test`]]

  public all = Option.Boolean(`-a,--all`, false)
  public integration = Option.Boolean(`-i,--integration`, false)
  public unit = Option.Boolean(`-u,--unit`, false)
  public workers = Option.String(`-w,--workers`, '50%')
  public update = Option.Boolean(`-up, --update`, false)

  async execute() {
    const all = (!this.unit && !this.integration) || this.all

    if (this.unit || all) {
      let unitCommand = `yarn jest --coverage --testPathIgnorePatterns="tests/integration" --testPathIgnorePatterns="tests/util" --maxWorkers=${this.workers}`
      if (this.update) unitCommand.concat(` --updateSnapshot`)

      await this.$(unitCommand)
    }

    if (this.integration || all) {
      let integrationCmd = `node ./jest.integration.js`
      if (this.update) integrationCmd.concat(` --updateSnapshot`)

      await this.$(integrationCmd)
    }
  }
}
