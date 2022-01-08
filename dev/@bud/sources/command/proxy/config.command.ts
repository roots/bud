import {CommandClass, Option} from 'clipanion'
import {REGISTRY_NPM, REGISTRY_PROXY} from '../../constants'

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

  public reset = Option.Boolean(`-r,--reset`, false, {
    description: `reset proxy config`,
  })

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'configure yarn to work with verdaccio',
    examples: [
      ['configure yarn', 'yarn @bud proxy config'],
      [
        'config yarn to npm defaults',
        'yarn @bud proxy config --reset',
      ],
    ],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(`yarn config set 'npmAuthToken' ''`)
    await this.$(
      `yarn config set npmRegistryServer ${
        this.reset ? REGISTRY_NPM : REGISTRY_PROXY
      }`,
    )
    await this.$(
      `yarn config set npmPublishRegistry ${
        this.reset ? REGISTRY_NPM : REGISTRY_PROXY
      }`,
    )
    await this.$(
      `yarn config set unsafeHttpWhitelist --json '[${
        this.reset ? `""` : `"localhost"`
      }]'`,
    )
  }
}
