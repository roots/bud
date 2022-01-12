import {CommandClass, Option} from 'clipanion'
import {bind} from 'helpful-decorators'
import {REGISTRY_NPM} from '../../constants'

import {Command} from '../base.command'

/**
 * Auth reset command class
 *
 * @internal
 */
export class AuthReset extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'auth reset'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    ['@bud', 'auth', 'reset'],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'reset authentication',
    examples: [['reset authentication', 'yarn @bud auth reset']],
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
      .set(`npmAuthToken`, '')
      .set('npmRegistryServer', 'https://registry.npmjs.org')
      .set('npmPublishRegistry', 'https://registry.npmjs.org')
      .set('unsafeHttpWhitelist', [])
      .write()
  }
}
