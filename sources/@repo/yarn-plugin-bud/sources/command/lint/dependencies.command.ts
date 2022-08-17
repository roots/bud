import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * `@bud lint dependencies` command class
 *
 * @internal
 */
export class LintDependencies extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud lint dependencies`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `lint`, `dependencies`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `ensure packages are synced`,
    examples: [
      [`lint dependency versions`, `yarn @bud lint dependencies`],
    ],
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
