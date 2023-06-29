import {path} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Tsc extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `tsc`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Run the typescript compiler`,
    examples: [[`tsc usage info`, `yarn @bud tsc --help`]],
  }

  public passthrough = Option.Proxy({name: `tsc options`})

  public async execute() {
    const args = [
      `node`,
      path(`node_modules`, `.bin`, `tsc`),
      ...this.passthrough,
    ]

    return await this.cli.run(args)
  }
}
