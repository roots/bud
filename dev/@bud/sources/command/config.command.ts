import {CommandClass, Option} from 'clipanion'
import {REGISTRY_NPM, REGISTRY_PROXY} from '../constants'

import {Command} from './base.command'

/**
 * Config command class
 *
 * @internal
 */
export class Config extends Command {
  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    ['@bud', 'config'],
  ]

  public proxy = Option.Boolean('--proxy', false, {
    description: 'configure for proxy',
  })

  public token = Option.String(
    '-t,--token',
    process.env.NPM_AUTH_TOKEN,
    {
      description: 'token',
    },
  )

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'configure yarn',
    examples: [
      ['configure for npm', 'yarn @bud config'],
      ['configure for verdaccio', 'yarn @bud config --proxy'],
      ['configure with token', 'yarn @bud config -t <token>'],
    ],
  }

  public get registry() {
    return this.proxy ? REGISTRY_PROXY : REGISTRY_NPM
  }

  public get httpAllowlist() {
    return this.proxy ? `"localhost"` : `''`
  }

  public get npmAuthToken() {
    return this.token ?? `''`
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(
      `yarn config set 'npmAuthToken' ${this.npmAuthToken}`,
    )
    await this.$(
      `yarn config set npmRegistryServer ${this.registry}`,
    )
    await this.$(
      `yarn config set npmPublishRegistry ${this.registry}`,
    )
    await this.$(
      `yarn config set unsafeHttpWhitelist --json '[${this.httpAllowlist}]'`,
    )
  }
}
