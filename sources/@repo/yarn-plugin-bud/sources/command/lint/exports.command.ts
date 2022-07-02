import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * Skypack command class
 *
 * @internal
 */
export class LintExports extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = '@bud lint exports'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `lint`, `exports`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `lint published package module exports`,
    examples: [
      [`lint package.json module exports`, `yarn @bud lint exports`],
    ],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(
      `yarn workspaces foreach --no-private exec yarn run package-check`,
    )
  }
}
