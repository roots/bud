import {CommandClass} from 'clipanion'
import {PM2_BIN_PATH, REGISTRY_PROXY} from '../../constants'

import {Command} from '../base.command'

/**
 * Proxy config command class
 *
 * @internal
 */
export class ProxyConfig extends Command {
  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    ['@bud', 'proxy', 'config'],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'configure yarn to work with verdaccio',
    examples: [['configure yarn', 'yarn @bud proxy config']],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(
      `yarn config set npmRegistryServer ${REGISTRY_PROXY}`,
    )
    await this.$(
      `yarn config set npmPublishRegistry ${REGISTRY_PROXY}`,
    )
    await this.$(
      `yarn config set unsafeHttpWhitelist --json '[localhost]'`,
    )
  }
}
