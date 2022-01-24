import {CommandClass} from 'clipanion'
import {TS_CONFIG_PATH} from '../constants'

import {Command} from './base.command'

export class Dev extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'dev'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `dev`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `develop project code`,
    examples: [[`dev`, `yarn @bud dev`]],
  }

  public async execute() {
    await this.$(
      `yarn tsc -b ${TS_CONFIG_PATH} --force --watch`,
    )
  }
}
