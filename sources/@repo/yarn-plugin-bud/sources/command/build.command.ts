import {TS_CONFIG_PATH} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Build command
 *
 * @public
 */
export class Build extends Command {
  /**
   * Command name
   *
   * @public
   */
  public name = 'build'

  /**
   * Command paths
   *
   * @public
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `build`]]

  /**
   * Command usage
   *
   * @public
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `build project packages`,
    examples: [[`build packages as commonjs`, `yarn @bud build`]],
  }

  /**
   * Passthrough args
   *
   * @public
   */
  public passthrough = Option.Proxy({
    name: `tsc options`,
  })

  /**
   * Execute command
   *
   * @public
   */
  public async execute() {
    await this.$(
      this.withPassthrough(`yarn tsc -b ${TS_CONFIG_PATH} --force`),
    )
    await this.$(`yarn @bud compile`)
  }
}
