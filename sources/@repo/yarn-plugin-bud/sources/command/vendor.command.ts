import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {join} from 'path'

import {Command} from './base.command'

const tsConfig = join(paths.config, `tsconfig.json`)
const vendor = join(paths.sources, `@repo/compile-kit/src/vendor/index.ts`)

/**
 * `@bud vendor` command
 *
 * @internal
 */
export class Vendor extends Command {
  /**
   * Command label
   *
   * @internal
   */
  public static label = `@bud vendor`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `vendor`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `vendor a package`,
  }

  /**
   * Rest parameters
   *
   * @internal
   */
  public request = Option.Rest()

  /**
   * Command execute
   *
   * @internal
   */
  public async execute() {
    await this.$(
      `yarn ts-node-esm --project ${tsConfig} ${vendor} ${this.request}`,
    )
  }
}
