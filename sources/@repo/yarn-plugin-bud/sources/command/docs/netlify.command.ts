import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

/**
 * Docs command class
 */
export class DocsNetlify extends Command {
  /**
   * Command name
   */
  public static label = `@bud netlify`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `netlify`],
    [`@bud`, `docs`, `netlify`],
  ]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `netlify alias`,
    examples: [[`run commands on netlify-cli`, `yarn @bud netlify`]],
  }

  /**
   * Variadic arguments
   */
  public passthrough = Option.Proxy({name: `netlify options`})

  /**
   * Execute command
   */
  public async execute() {
    await this.$(this.withPassthrough(`yarn workspace @repo/docs netlify`))
  }
}
