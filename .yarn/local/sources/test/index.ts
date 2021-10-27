import {Command} from '../Command'
import {Option} from 'clipanion'

export class TestCommand extends Command {
  static paths = [[`kjo`, `test`]]

  public workers = Option.String(`-w,--workers`, '50%')
  public update = Option.Boolean(`--update`, false)
  public unit = Option.Boolean(`-u,--unit`, false)
  public integration = Option.Boolean(`-i,--integration`, false)

  async execute() {
    let all = false
    if (!this.unit && !this.integration) all = true

    if (this.unit) {
      await this.$(
        `yarn jest --projects dev/jest/jest.unit.js --verbose --maxWorkers=${
          this.workers
        } ${this.update ? `--updateSnapshot` : `--coverage`}`,
      )
    }

    if (this.integration) {
      await this.$(
        `yarn jest --projects dev/jest/jest.integration.js --verbose --maxWorkers=${
          this.workers
        } ${this.update ? `--updateSnapshot` : `--coverage`}`,
      )
    }

    if (all) {
      await this.$(
        `yarn jest --projects dev/jest/jest.all.js --verbose --maxWorkers=${
          this.workers
        } ${this.update ? `--updateSnapshot` : `--coverage`}`,
      )
    }
  }
}
