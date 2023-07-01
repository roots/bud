import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Netlify extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `netlify`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run netlify`,
    examples: [[`netlify usage info`, `yarn @bud netlify --help`]],
  }

  public passthrough = Option.Proxy({name: `netlify options`})

  public async execute() {
    return await this.cli
      .run([
        `workspace`,
        `@repo/docs`,
        `netlify`,
        ...(this.passthrough ?? []),
      ])
      .catch(error => {
        throw error
      })
  }
}
