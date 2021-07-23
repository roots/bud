import {Command} from '../Command'
import {Option} from 'clipanion'

export class TestCommand extends Command {
  static paths = [[`kjo`, `test`]]

  public unit = Option.Boolean(`-u,--unit`, false)
  public integration = Option.Boolean(`-i,--integration`, false)

  public commands = {
    unit: [
      `yarn jest --coverage --testPathIgnorePatterns="tests/integration" --testPathIgnorePatterns="tests/util"`,
    ],
    integration: [`node ./jest.integration.js`],
  }

  async execute() {
    const itinerary = []

    if (this.unit) itinerary.push(this.commands.unit)
    if (this.integration)
      itinerary.push(this.commands.integration)

    if (!this.unit && !this.integration)
      itinerary.push(
        Object.values(this.commands).reduce((a, v) => [
          ...a,
          ...v,
        ]),
        [],
      )

    await this.$(itinerary)
  }
}
