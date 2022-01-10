import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * Proxy command class
 *
 * @internal
 */
export class ProxyRemake extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'proxy remake'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    ['@bud', 'proxy', 'remake'],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'remake proxy server',
    examples: [
      ['run verdaccio server', 'yarn @bud proxy remake'],
    ],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(`yarn @bud proxy delete`)
    await this.$(`yarn @bud proxy make`)
  }
}
