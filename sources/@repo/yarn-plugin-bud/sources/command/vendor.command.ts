import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {join} from 'path'

import {Command} from './base.command'

/**
 * Vendor command
 */
export class Vendor extends Command {
  /**
   * Command label
   */
  public static label = `@bud vendor`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `vendor`]]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `vendor a package`,
  }

  /**
   * Rest parameters
   */
  public request = Option.Rest()

  /**
   * Command execute
   */
  public async execute() {
    const tsConfig = join(paths.config, `tsconfig.json`)
    const vendor = join(
      paths.sources,
      `@repo/compile-kit/src/vendor/index.js`,
    )

    await this.$(
      `yarn ts-node-esm --project ${tsConfig} ${vendor} ${this.request}`,
    )
  }
}
