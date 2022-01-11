import {CommandClass, Option} from 'clipanion'
import {bind} from 'helpful-decorators'

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
   * Requires container
   *
   * @remarks
   * Will fail if process.env.BUD_ENV does not equal 'container'
   *
   * @internal
   */
  public requiresContainer = true

  /**
   * Unmodified version string
   *
   * @remarks
   * This is used to restore the version after publishing
   *
   * @internal
   */
  public unmodifiedVersion: string

  /**
   * This is a custom error handler
   *
   * @remarks
   * This is used so we can restore the version if the
   * proxy publish fails
   *
   * @param e
   *
   * @internal
   */
  public async errorHandler(e: string) {
    this.err(e)

    await this.restoreUnmodifiedVersion()
    await this.$(`yarn @bud config`)

    process.exit(1)
  }

  /**
   * Execute command
   *
   * @internal
   */
  @bind
  public async execute() {
    await this.setUnmodifiedVersion()

    if (!this.version) this.version = '0.0.0'

    await this.$(`yarn @bud config --proxy`)

    await this.$(
      `yarn workspaces foreach --no-private exec npm version ${this.version}`,
    )

    await this.$(`yarn @bud build`)

    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public --tag dev`,
    )

    await this.restoreUnmodifiedVersion()

    await this.$(`yarn @bud config`)
  }

  /**
   * Set unmodified version
   *
   * @internal
   */
  @bind
  public async setUnmodifiedVersion() {
    const {version} = await this.getManifest()
    this.unmodifiedVersion = version
  }

  /**
   * Restore unmodified version
   *
   * @internal
   */
  @bind
  public async restoreUnmodifiedVersion() {
    await this.$(
      `yarn workspaces foreach --no-private exec npm version ${this.unmodifiedVersion}`,
    )
  }
}
