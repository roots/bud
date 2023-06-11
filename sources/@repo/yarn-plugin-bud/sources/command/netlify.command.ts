import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Docs command class
 */
export class DocsNetlify extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `netlify`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `netlify alias`,
    examples: [[`run commands on netlify-cli`, `yarn @bud netlify`]],
  }

  /**
   * Variadic arguments
   */
  public passthrough = Option.Proxy({name: `netlify options`})

  public async execute() {
    await this.cli.run([
      `workspace`,
      `@repo/docs`,
      `netlify`,
      ...(this.passthrough ?? []),
    ])
  }
}
