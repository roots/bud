import {Command} from '../Command'
import {Option} from 'clipanion'

export class BuildCommand extends Command {
  static paths = [[`kjo`, `build`]]

  public cjs = Option.Boolean(`-c,--cjs`, false)
  public esm = Option.Boolean(`-e,--esm`, false)
  public commands = {
    all: `yarn workspaces foreach --topological-dev --no-private --exclude @roots/bud-typings -i -p -v run build`,
    cjs: `yarn workspaces foreach --topological-dev --no-private --exclude @roots/bud-typings -i -p -v run build:cjs`,
    esm: `yarn workspaces foreach --topological-dev --no-private --exclude @roots/bud-typings -i -p -v run build:esm`,
  }

  async execute() {
    const itinerary = []

    if (this.cjs) itinerary.push(this.commands.cjs)
    if (this.esm) itinerary.push(this.commands.esm)

    if (!this.cjs && !this.esm) itinerary.push(this.commands.all)

    await this.$(itinerary)
  }
}
