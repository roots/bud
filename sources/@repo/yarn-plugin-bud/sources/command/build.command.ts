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
    await this.$(this.withPassthrough(`yarn tsc -b ${TS_CONFIG_PATH}`))

    await [
      `yarn @bud compile @roots/container`,
      `yarn @bud compile @roots/bud-dashboard`,
      `yarn @bud compile @roots/bud-support`,
      `yarn @bud compile @roots/wordpress-dependencies-webpack-plugin`,
      `yarn @bud compile @roots/wordpress-externals-webpack-plugin`,
      `yarn @bud compile @roots/entrypoints-webpack-plugin`,
      `yarn @bud compile @roots/bud-entrypoints`,
    ].reduce(async (a, c) => {
      await a
      await this.$(c)
    }, Promise.resolve())
  }
}
