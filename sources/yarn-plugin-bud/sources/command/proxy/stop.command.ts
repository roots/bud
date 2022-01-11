import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * Proxy command class
 *
 * @internal
 */
export class ProxyStop extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'proxy stop'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    ['@bud', 'proxy', 'stop'],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'stop proxy server',
    examples: [['run verdaccio server', 'yarn @bud proxy stop']],
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
  public async execute() {
    await this.$(`yarn pm2 stop verdaccio`)
    await this.$(`rm -rf /verdaccio/storage`)
  }
}
