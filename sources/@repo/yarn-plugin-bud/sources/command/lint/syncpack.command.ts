import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * Syncpack command class
 *
 * @internal
 */
export class Syncpack extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'syncpack'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `syncpack`],
    [`@bud`, `lint`, `syncpack`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `ensure packages are synced across repo`,
    examples: [[`run syncpack`, `yarn @bud lint syncpack`]],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(
      `yarn syncpack list-mismatches --config ./config/syncpack.config.cjs`,
    )
  }
}
