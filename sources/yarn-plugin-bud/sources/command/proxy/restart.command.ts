import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * Proxy command class
 *
 * @internal
 */
export class ProxyRestart extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'proxy restart'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    ['@bud', 'proxy', 'restart'],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'restart proxy repo',
    examples: [
      ['run verdaccio server', 'yarn @bud proxy restart'],
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
  public async execute() {
    await this.$(`yarn pm2 restart verdaccio`)
  }
}
