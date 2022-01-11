import {CommandClass, Option} from 'clipanion'
import {bind} from 'helpful-decorators'

import {Command} from '../base.command'

/**
 * Npm command class
 *
 * @internal
 */
export class AuthNpm extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'auth npm'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    ['@bud', 'auth', 'npm'],
  ]

  /**
   * --token flag
   *
   * @internal
   */
  public token = Option.String(
    '-t,--token',
    process.env.NPM_AUTH_TOKEN ?? '',
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
    description: 'authenticate with npm',
    examples: [['authenticate', 'yarn @bud auth npm']],
  }

  /**
   * Execute command
   *
   * @internal
   */
  @bind
  public async execute() {
    const yarnrc = await this.getYarnYml()

    await yarnrc
      .set('npmAuthIdent', '')
      .set('npmAuthToken', this.token)
      .set('npmRegistryServer', 'https://registry.npmjs.org')
      .set('npmPublishRegistry', 'https://registry.npmjs.org')
      .set('unsafeHttpWhitelist', [])
      .write()
  }
}
