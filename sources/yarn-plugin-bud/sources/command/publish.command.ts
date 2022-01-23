import {CommandClass, Option} from 'clipanion'
import {bind} from 'helpful-decorators'

import {Command} from './base.command'

/**
 * Publish command class
 *
 * @internal
 */
export class Publish extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'publish'

  /**
   * Requires container
   *
   * @remarks
   * Will fail if process.env.BUD_ENV does not equal 'container'
   *
   * @internal
   */
  public requiresContainer = true

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [['@bud', 'publish']]

  /**
   * --tag flag
   *
   * @internal
   */
  public tag = Option.String(`-t,--tag`, null, {
    description: `tag`,
  })

  /**
   * Execute command
   *
   * @internal
   */
  @bind
  public async execute() {
    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public --tag ${this.tag}`,
    )
  }
}
