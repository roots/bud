import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

/**
 * Proxy command class
 *
 * @internal
 */
export class ProxyPublish extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'proxy publish'

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

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    if (!this.version) {
      const {version} = await this.getManifest()
      this.version = version
    }

    await this.$(`yarn @bud config --proxy`)

    await this.$(
      `yarn workspaces foreach --no-private exec npm version ${this.version}`,
    )

    await this.$(`yarn @bud build`)

    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public --tag dev`,
    )

    await this.$(`yarn @bud config`)
  }
}
