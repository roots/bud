import {paths, REPO_PATH} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {join} from 'path'

import {Command} from './base.command'

export class Tsc extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'tsc'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `tsc`],
    [`@bud`, `build`],
  ]

  /**
   * TSConfig path
   *
   * @internal
   */
  public tsconfig = join(paths.config, 'tsconfig.json')

  /**
   * Variadic arguments
   *
   * @internal
   */
  public passthrough = Option.Proxy({name: `tsc options`})

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Run the typescript compiler`,
    examples: [[`Run the typescript compiler`, `yarn @bud tsc`]],
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
