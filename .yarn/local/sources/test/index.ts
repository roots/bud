import {Command} from '../Command'
import {Option} from 'clipanion'

export class TestCommand extends Command {
  static paths = [[`kjo`, `test`]]

  public workers = Option.String(`-w,--workers`, '50%')
  public update = Option.Boolean(`--update`, false)

  async execute() {
    return await this.$(
      `yarn jest --verbose --maxWorkers=${this.workers} ${
        this.update ? `--updateSnapshot` : `--coverage`
      }`,
    )
  }
}
