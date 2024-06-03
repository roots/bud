import {path} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command.js'

export class Tsc extends Command {
  public static override paths: CommandClass['paths'] = [[`@bud`, `tsc`]]

  public static override usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Run the typescript compiler`,
    examples: [[`tsc usage info`, `yarn @bud tsc --help`]],
  }

  public passthrough = Option.Proxy({name: `tsc options`})

  public async execute() {
    return await this.cli
      .run([
        `node`,
        path(`node_modules`, `.bin`, `tsc`),
        ...this.passthrough,
      ])
      .then(this.throwIfError)
      .catch(this.catch)
  }
}
