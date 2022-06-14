import {CommandClass, Option} from 'clipanion'
import * as fs from 'fs-extra'
import {get, isString} from 'lodash-es'

import {Command} from './base.command'

/**
 * Base class
 *
 * @internal
 */
export abstract class Get extends Command {
  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [['package', 'get']]

  public property = Option.String()

  public async execute() {
    const json = await fs.readJson(`${this.context.cwd}/package.json`)
    const value = get(json, this.property)
    const normal = isString(value) ? value : JSON.stringify(value)

    this.context.stdout.write(`${normal}\n`)
  }
}
