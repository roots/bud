import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * bud syncpack command class
 */
export class LintDependencies extends Command {
  /**
   * Command name
   */
  public static label = `@bud syncpack`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `lint`, `dependencies`],
    [`@bud`, `syncpack`],
  ]

  /**
   * Command usage
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
   */
  public async execute() {
    await this.$([
      `yarn`,
      [
        `syncpack`,
        `list-mismatches`,
        `--config`,
        `./config/syncpack.config.cjs`,
      ],
    ])
  }
}
