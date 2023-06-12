import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Netlify extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `netlify`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud-tools`,
    description: `run netlify`,
    examples: [[`run netlify`, `yarn @bud netlify`]],
  }

  public passthrough = Option.Proxy({name: `netlify options`})

  public async execute() {
    await this.cli
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
