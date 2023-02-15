import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {join} from 'path'

import {Command} from './base.command'

/**
 * `@bud tsc` command
 */
export class Tsc extends Command {
  /**
   * Command name
   */
  public static label = `@bud tsc`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `tsc`],
    [`@bud`, `build`],
  ]

  /**
   * TSConfig path
   */
  public tsconfig = join(paths.config, `tsconfig.json`)

  /**
   * Variadic arguments
   */
  public passthrough = Option.Proxy({name: `tsc options`})

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Run the typescript compiler`,
    examples: [
      [`run the typescript compiler`, `yarn @bud tsc`],
      [
        `run the typescript compiler in watch mode`,
        `yarn @bud tsc --watch`,
      ],
      [
        `run the typescript compiler with forced rebuild (no incremental compilation)`,
        `yarn @bud tsc --force`,
      ],
    ],
  }

  /**
   * Command execute
   *
   * @public
   */
  public async execute() {
    await this.$(this.withPassthrough(`yarn tsc -b ${this.tsconfig}`))
  }
}
