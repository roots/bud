import {REPO_PATH} from '@repo/constants'
import {CommandClass} from 'clipanion'
import {bind} from 'helpful-decorators'

import {Command} from './base.command'

/**
 * Publish command class
 *
 * @internal
 */
export class Verdaccio extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'verdaccio'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [['@bud', 'verdaccio']]

  /**
   * Execute command
   *
   * @internal
   */
  @bind
  public async execute() {
    await this.$(
      `yarn verdaccio --config ${REPO_PATH}/config/verdaccio/config.yaml`,
    )
  }
}
