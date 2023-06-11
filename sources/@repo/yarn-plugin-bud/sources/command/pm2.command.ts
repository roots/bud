/* eslint-disable no-console */
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Pm2 extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `pm2`]]

  public passthrough = Option.Proxy({name: `pm2 options`})

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `registry access`,
    examples: [[`work with pm2`, `yarn @bud pm2`]],
  }

  public async execute() {
    try {
      await this.cli.run(
        [`pm2`, ...(this.passthrough ?? [])].filter(Boolean),
      )
    } catch (e) {}
  }
}
