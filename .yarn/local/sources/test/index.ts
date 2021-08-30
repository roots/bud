import {Command} from '../Command'
import {Option} from 'clipanion'

export class TestCommand extends Command {
  static paths = [[`kjo`, `test`]]

  public all = Option.Boolean(`-a,--all`, false)
  public workers = Option.String(`-w,--workers`, '50%')
  public update = Option.Boolean(`--update`, false)

  async execute() {
    await this.$(
      `yarn jest --maxWorkers=${this.workers} ${
        this.update ? `--updateSnapshot` : `--coverage`
      }`,
    )
  }
}
