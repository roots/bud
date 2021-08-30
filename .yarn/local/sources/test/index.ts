import {Command} from '../Command'
import {Option} from 'clipanion'

export class TestCommand extends Command {
  static paths = [[`kjo`, `test`]]

  public all = Option.Boolean(`-a,--all`, false)
  public workers = Option.String(`-w,--workers`, '50%')
  public update = Option.Boolean(`--update`, false)
  public unit = Option.Boolean(`-u,--unit`, false)
  public integration = Option.Boolean(`-i,--integration`, false)

  async execute() {
    if (!this.unit && !this.integration) this.all = true

    if (this.all || this.unit) {
      await this.$(
        `yarn jest unit --verbose --maxWorkers=${this.workers} ${
          this.update ? `--updateSnapshot` : `--coverage`
        }`,
      )
    }

    if (this.all || this.integration) {
      await this.$(
        `yarn jest integration --verbose --maxWorkers=${this.workers}`,
      )
    }
  }
}
