import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * Skypack command class
 *
 * @internal
 */
export class Skypack extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'skypack'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `lint`, `skypack`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `lint`,
    description: `lint published package module exports`,
    examples: [
      [`lint package.json module exports`, `yarn @bud lint skypack`],
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
