import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

/**
 * Docs command class
 *
 * @internal
 */
export class DocsNetlify extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud netlify`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `netlify`],
    [`@bud`, `docs`, `netlify`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `netlify alias`,
    examples: [[`run commands on netlify-cli`, `yarn @bud netlify`]],
  }

  /**
   * Variadic arguments
   *
   * @internal
   */
  public passthrough = Option.Proxy({name: `netlify options`})

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(this.withPassthrough(`yarn workspace @repo/docs netlify`))
  }
}
