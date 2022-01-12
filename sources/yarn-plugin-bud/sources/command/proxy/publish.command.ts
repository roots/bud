import {CommandClass, Option} from 'clipanion'
import {bind} from 'helpful-decorators'

import {Command} from '../base.command'

/**
 * Proxy Publish command class
 *
 * @internal
 */
export class ProxyPublish extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'proxy auth'

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
    description: 'authenticate with proxy repository',
    examples: [['publish', 'yarn @bud proxy publish']],
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

  public hasErrors = false

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
    this.hasErrors = true
  }

  /**
   * Execute command
   *
   * @internal
   */
  @bind
  public async execute() {
    const {version} = await this.getManifest()
    this.unmodifiedVersion = version
    if (!this.version) this.version = '0.0.0'

    await this.$(`yarn @bud auth proxy`)
    await this.$(`yarn @bud version ${this.version}`)
    await this.$(
      `yarn @bud publish --tag latest --registry https://verdaccio:4873/`,
    )

    await this.$(`yarn @bud auth npm`)
    await this.$(`yarn @bud version ${this.unmodifiedVersion}`)

    await this.$(`cd /tests/`)
    await this.$(
      `yarn config set registry http://verdaccio:4873/`,
    )
    await this.$(
      `npm config set registry http://verdaccio:4873/`,
    )

    if (this.hasErrors) {
      throw new Error(`Proxy publish failed`)
    }
  }
}
