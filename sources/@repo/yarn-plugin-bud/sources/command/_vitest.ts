import {path} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command.js'

export class Vitest extends Command {
  public static override paths: CommandClass['paths'] = [
    [`@bud`, `vitest`],
  ]

  public static override usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Run vitest`,
    examples: [[`vitest usage info`, `yarn @bud vitest --help`]],
  }

  public passthrough = Option.Proxy({name: `vitest options`})

  public async execute() {
    return await this.cli
      .run([
        `node`,
        path(`node_modules`, `.bin`, `vitest`),
        ...this.passthrough,
      ])
      .then(this.throwIfError)
      .catch(this.catch)
  }
}
