import {Command} from '../Command'
import {Option} from 'clipanion'

export class TestCommand extends Command {
  static paths = [[`kjo`, `test`]]

  public all = Option.Boolean(`-a,--all`, false)
  public integration = Option.Boolean(`-i,--integration`, false)
  public unit = Option.Boolean(`-u,--unit`, false)
  public workers = Option.String(`-w,--workers`, '50%')
  public update = Option.Boolean(`--update`, false)

  async execute() {
    const all = (!this.unit && !this.integration) || this.all

    if (this.unit || all) {
      await this.$(
        `yarn jest unit --maxWorkers=${this.workers} ${
          this.update ? `--updateSnapshot` : `--coverage`
        }`,
      )
    }

    if (this.integration || all) {
      let integrationCmd = `node ./jest.integration.js`
      if (this.update) integrationCmd.concat(` --update`)

      await this.$(integrationCmd)
    }
  }
}
