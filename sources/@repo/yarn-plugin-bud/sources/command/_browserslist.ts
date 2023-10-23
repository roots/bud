import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Browserslist extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `browserslist`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run browserslist`,
    examples: [
      [`browserslist usage info`, `yarn @bud browserslist --help`],
    ],
  }

  public passthrough = Option.Proxy({name: `browserslist options`})

  public async execute() {
    return await this.cli
      .run([`browserslist`, ...(this.passthrough ?? [])])
      .then(this.throwIfError)
      .catch(this.catch)
  }
}
