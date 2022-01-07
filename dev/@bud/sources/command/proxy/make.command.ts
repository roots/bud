import {CommandClass} from 'clipanion'
import {PM2_BIN_PATH} from '../../constants'

import {Command} from '../base.command'

/**
 * Proxy command class
 *
 * @internal
 */
export class ProxyMake extends Command {
  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    ['@bud', 'proxy', 'make'],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'make proxy server',
    examples: [
      ['make verdaccio server', 'yarn @bud proxy make'],
    ],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(`yarn cache clean --all`)
    await this.$(`yarn @bud proxy config`)
    await this.$(`yarn @bud proxy start`)
    await this.$(`yarn install --immutable`)
  }
}
