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
  public static paths: CommandClass['paths'] = [
    [`@bud`, `eslint`],
    [`@bud`, `lint`, `eslint`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `lint repo files. run all linters by passing no flags.`,
    examples: [
      [`run all linters`, `yarn @bud lint`],
      [`run prettier`, `yarn @bud lint --prettier`],
      [`run eslint`, `yarn @bud lint eslint`],
      [`run skypack`, `yarn @bud lint --skypack`],
      [`lint on type definitions as well`, `yarn @bud lint --types`],
    ],
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
