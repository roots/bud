import {CommandContext} from '@yarnpkg/core'
import {join} from 'path'

import {Yml} from './yml'

/**
 * .yarnrc.yml helper
 *
 * @internal
 */
export class YarnRC {
  /**
   * Find yarnrc
   *
   * @internal
   */
  public static async find(context: CommandContext) {
    return await new Yml(join(context.cwd, `.yarnrc.yml`)).read()
  }
}
