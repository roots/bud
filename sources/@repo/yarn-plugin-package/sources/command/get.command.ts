import {join} from 'path'

import {CommandClass, Option} from 'clipanion'
import * as fs from 'fs-jetpack'
import {get, isString} from 'lodash-es'

import {Command} from './base.command'

/**
 * Base class
 */
export abstract class Get extends Command {
  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [[`package`, `get`]]

  /**
   * The property to get
   */
  public property = Option.String()

  /**
   * Command execute
   */
  public async execute() {
    const json = await fs.readAsync(
      join(this.context.cwd, `package.json`),
      `json`,
    )
    const value = get(json, this.property)
    const normal = isString(value) ? value : JSON.stringify(value)

    this.context.stdout.write(`${normal}\n`)
  }
}
