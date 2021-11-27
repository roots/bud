import {Command} from '../Command'
import {Option} from 'clipanion'

export class TestCommand extends Command {
  static paths = [[`repo`, `test`]]
  static usage = {
    category: `repo`,
    details: `test files with jest`,
    examples: [
      [`test`, `yarn repo test`],
      [`update snapshots`, `yarn repo test --update`],
    ],
  }

  public workers = Option.String(`-w,--workers`, '50%', {
    description: `number of workers. default 50%.`,
  })
  public update = Option.Boolean(`--update`, false, {
    description: `update snapshots. default false.`,
  })

  async execute() {
    await this.$(
      `yarn jest --verbose --maxWorkers=${this.workers} ${
        this.update ? `--updateSnapshot` : `--coverage`
      }`,
    )
  }
}
