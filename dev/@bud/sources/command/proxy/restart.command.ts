import {CommandClass} from 'clipanion'
import {PM2_BIN_PATH} from '../../constants'

import {Command} from '../base.command'

/**
 * Proxy command class
 *
 * @internal
 */
export class ProxyRestart extends Command {
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
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(`yarn pm2 restart verdaccio`)
  }
}
