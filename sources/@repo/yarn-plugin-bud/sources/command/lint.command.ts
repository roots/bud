import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Lint command class
 *
 * @internal
 */
export class Lint extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud lint`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `lint`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run eslint`,
    examples: [[`run eslint`, `yarn @bud lint`]],
  }

  /**
   * Variadic arguments
   *
   * @internal
   */
  public passthrough = Option.Proxy({name: `eslint options`})

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(
      this.withPassthrough(
        `yarn eslint "./sources/*/*/src/**/*.{ts,tsx,js,jsx}" "./sources/*/*/sources/**/*.{ts,tsx,js,jsx}" "./tests/**/*.{ts,tsx,js,jsx}" --config ./config/eslint.config.cjs --no-error-on-unmatched-pattern`,
      ),
    )
  }
}
