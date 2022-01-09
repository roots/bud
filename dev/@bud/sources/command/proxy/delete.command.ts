import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * Proxy delete command class
 *
 * @internal
 */
export class ProxyDelete extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'proxy delete'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    ['@bud', 'proxy', 'delete'],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'delete verdaccio server',
    examples: [
      ['delete verdaccio server', 'yarn @bud proxy delete'],
    ],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(`yarn pm2 delete verdaccio`)
  }
}
