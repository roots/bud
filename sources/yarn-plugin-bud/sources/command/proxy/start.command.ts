import {CommandClass} from 'clipanion'
import {bind} from 'helpful-decorators'

import {Command} from '../base.command'

/**
 * Proxy command class
 *
 * @internal
 */
export class ProxyStart extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'proxy start'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    ['@bud', 'proxy', 'start'],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'start proxy server',
    examples: [
      ['run verdaccio server', 'yarn @bud proxy start'],
    ],
  }

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
   * Execute command
   *
   * @internal
   */
  @bind
  public async execute() {
    await this.$(`yarn pm2 start /bud/config/pm2.config.js`)
  }
}
