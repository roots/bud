import {Command} from '../Command'

export class MakeCommand extends Command {
  static paths = [[`kjo`, `make`]]

  public commands = {}

  async execute() {
    const itinerary = [
      `yarn install --immutable`,
      `yarn kjo build -c`,
      `yarn kjo test`,
      `yarn kjo lint -j -p`,
    ]

    await this.$(itinerary)
  }
}
