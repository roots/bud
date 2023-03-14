import {CommandClass, Option} from 'clipanion'
import * as fs from 'fs-extra'
import {set} from 'lodash-es'

import {Command} from './base.command'

/**
 * Base class
 */
export abstract class Set extends Command {
  public static paths: CommandClass['paths'] = [[`package`, `set`]]

  public prop = Option.String()

  public _value = Option.String()

  public get value() {
    return this._value
  }

  public async execute() {
    this.context.stdout.write(
      `Setting ${this.prop} to ${this.value} in ${this.context.cwd}/package.json\n`,
    )

    const json = await fs.readJson(`${this.context.cwd}/package.json`)
    set(json, this.prop, this.value)

    await fs.writeFile(
      `${this.context.cwd}/package.json`,
      JSON.stringify(json, null, 2),
    )
  }
}
