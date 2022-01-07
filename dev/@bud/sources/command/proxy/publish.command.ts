import {CommandClass, Option} from 'clipanion'
import {PM2_BIN_PATH} from '../../constants'

import {Command} from '../base.command'

/**
 * Proxy command class
 *
 * @internal
 */
export class ProxyPublish extends Command {
  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    ['@bud', 'proxy', 'publish'],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description: 'publish packages to proxy repo',
    examples: [
      [
        'publish packages to verdaccio',
        'yarn @bud proxy publish',
      ],
    ],
  }

  public version = Option.String(`-v,--version`, null, {
    description: `version`,
  })

  public tag = Option.String(`-t,--tag`, `dev`, {
    description: `tag`,
  })

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(`yarn @bud proxy config`)

    await this.$(
      `yarn workspaces foreach --no-private exec npm version ${this.version}`,
    )

    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public --tag ${this.tag}`,
    )

    await this.$(`yarn install --immutable`)
  }
}
