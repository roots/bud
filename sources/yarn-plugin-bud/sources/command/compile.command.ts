import {CommandClass, Option} from 'clipanion'
import {TS_CONFIG_PATH} from '../constants'

import {Command} from './base.command'

export class Compile extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'compile'

  public static paths: CommandClass['paths'] = [
    [`@bud`, `compile`],
  ]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `compile a package`,
    details: `compiles as both cjs and esm with ncc`,
    examples: [
      [
        `compile {package name}`,
        `yarn @bud compile @roots/bud-support`,
      ],
    ],
  }

  public package = Option.String()

  public async execute() {
    await this.$(
      `yarn ts-node --project ${TS_CONFIG_PATH} ./dev/compile/cjs ${this.package}`,
    )
  }
}
