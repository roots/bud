import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Version command
 *
 * @internal
 */
export class Version extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = '@bud version'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `version`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `bump version of public packages`,
    examples: [[`Bump packages to x.y.z`, `yarn @bud version x.y.z`]],
  }

  /**
   * version (positional)
   *
   * @internal
   */
  public version = Option.String()

  /**
   * execute command
   *
   * @internal
   */
  public async execute() {
    if (!this.version) {
      const {version} = await this.getManifest()
      this.version = version
    }

    await this.$(
      `yarn workspaces foreach --no-private package set version ${this.version}`,
    )
  }
}
