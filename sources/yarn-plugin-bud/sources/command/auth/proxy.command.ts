import {CommandClass, Option} from 'clipanion'
import {bind} from 'helpful-decorators'

import {Command} from '../base.command'

/**
 * Authenticate proxy command class
 *
 * @internal
 */
export class AuthProxy extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'auth proxy'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    ['@bud', 'auth', 'proxy'],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'authenticate with proxy',
    examples: [['auth verdaccio', 'yarn @bud auth proxy']],
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
  @bind
  public async execute() {
    const yarnrc = await this.getYarnYml()

    await yarnrc
      .set('npmAuthToken', '')
      .set('npmAuthIdent', 'test:test')
      .set('npmRegistryServer', 'http://verdaccio:4873')
      .set('npmPublishRegistry', 'http://verdaccio:4873')
      .set('unsafeHttpWhitelist', ['verdaccio'])
      .write()
  }
}
