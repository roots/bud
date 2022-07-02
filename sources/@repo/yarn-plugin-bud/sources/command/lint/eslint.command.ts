import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

/**
 * Lint command class
 *
 * @internal
 */
export class Eslint extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'eslint'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `lint`, `eslint`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run eslint`,
    examples: [[`run eslint`, `yarn @bud eslint`]],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(
      `yarn eslint "./sources/@roots/*/src/**/*" --config ./config/eslint.config.cjs --ignore-path config/.eslintignore --no-error-on-unmatched-pattern`,
    )
  }
}
