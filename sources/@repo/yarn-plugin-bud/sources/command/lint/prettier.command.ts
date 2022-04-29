import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * Prettier command class
 *
 * @internal
 */
export class Prettier extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'lint'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `prettier`],
    [`@bud`, `lint`, `prettier`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `lint repo files. run all linters by passing no flags.`,
    examples: [[`run prettier`, `yarn @bud lint prettier`]],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(
      `yarn prettier ./sources/@roots/*/src/**/* --config ./config/prettier.config.js --write --ignore-unknown --no-error-on-unmatched-pattern`,
      `yarn prettier ./sources/@roots/*/lib/**/* --config ./config/prettier.config.js --write --ignore-unknown --no-error-on-unmatched-pattern`,
      `yarn prettier ./sources/@roots/*/types/**/*.d.ts --config ./config/prettier.config.js --write --ignore-unknown --no-error-on-unmatched-pattern`,
    )
  }
}
