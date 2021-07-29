import {Command} from '../Command'
import {Option} from 'clipanion'

export class MakeCommand extends Command {
  static paths = [[`kjo`, `make`]]

  public dfx = Option.Boolean(`-d,--dfx`, false)

  async execute() {
    const itinerary = [
      `yarn install --immutable`,
      `yarn kjo clean`,
      `yarn kjo build`,
      `yarn kjo test`,
      `yarn`,
      `yarn kjo lint`,
      `yarn kjo gen`,
    ]

    await this.$(itinerary)
  }
}
