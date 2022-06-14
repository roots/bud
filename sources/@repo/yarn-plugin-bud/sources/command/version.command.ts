import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Version command
 *
 * @internal
 */
export class Version extends Command {
  /**
   * version (positional)
   *
   * @internal
   */
  public version = Option.String()

  /**
   * Command name
   *
   * @internal
   */
  public name = 'version'

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
    examples: [[`yarn @bud version x.y.z`, `Bump packages to x.y.z`]],
  }

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
