import {CommandClass, Option} from 'clipanion'
import {TS_CONFIG_PATH} from '../constants'

import {Command} from './base.command'

/**
 * Build command
 *
 * @internal
 */
export class Build extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'build'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `build`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `build project packages`,
    examples: [[`build packages as commonjs`, `yarn @bud build`]],
  }

  /**
   * Passthrough args
   *
   * @internal
   */
  public passthrough = Option.Proxy({
    name: `tsc options`,
  })

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(this.withPassthrough(`yarn tsc -b ${TS_CONFIG_PATH}`))

    await this.$(
      `yarn @bud compile @roots/container`,
      `yarn @bud compile @roots/bud-dashboard`,
      `yarn @bud compile @roots/bud-support`,
      `yarn @bud compile @roots/wordpress-dependencies-webpack-plugin`,
      `yarn @bud compile @roots/wordpress-externals-webpack-plugin`,
      `yarn @bud compile @roots/entrypoints-webpack-plugin`,
    )
  }
}
