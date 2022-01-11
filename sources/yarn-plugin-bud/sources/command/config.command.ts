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
   * Command name
   *
   * @internal
   */
  public name = 'config'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    ['@bud', 'config'],
  ]

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

  /**
   * --proxy flag
   *
   * @internal
   */
  public proxy = Option.Boolean('--proxy', false, {
    description: 'configure for proxy',
  })

  /**
   * --token flag
   *
   * @internal
   */
  public token = Option.String(
    '-t,--token',
    process.env.NPM_AUTH_TOKEN,
    {
      description: 'token',
    },
  )

  /**
   * Registry value
   *
   * @remarks
   * Set based on presence of `--proxy` flag
   *
   * @internal
   */
  public get registry() {
    return this.proxy ? REGISTRY_PROXY : REGISTRY_NPM
  }

  /**
   * Get http allowlist
   *
   * @internal
   */
  public get httpAllowlist() {
    return this.proxy ? [`localhost`] : []
  }

  /**
   * Get npm auth token
   *
   * @internal
   */
  public get npmAuthIdent(): string {
    return this.proxy ? 'test:test' : ``
  }

  /**
   * Get npm auth token
   *
   * @internal
   */
  public get npmAuthToken() {
    return this.token ?? ``
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    const yarnrc = await this.getYarnYml()

    await yarnrc
      .set('npmAuthToken', this.npmAuthToken)
      .set('npmAuthIdent', this.npmAuthIdent)
      .set('npmRegistryServer', this.registry)
      .set('npmPublishRegistry', this.registry)
      .set('unsafeHttpWhitelist', this.httpAllowlist)
      .write()
  }
}
