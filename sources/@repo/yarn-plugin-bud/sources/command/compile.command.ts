import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {join} from 'path'

import {Command} from './base.command'

const tsConfig = join(paths.config, 'tsconfig.json')
const ncc = join(paths.sources, `@repo/compile-kit/src/cjs`)

const tsConfigEsm = join(paths.config, 'tsconfig.esm.json')
const nccEsm = join(paths.sources, `@repo/compile-kit/src/esm`)

export class Compile extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'compile'

  public static paths: CommandClass['paths'] = [[`@bud`, `compile`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `compile a package`,
    details: `compiles as both cjs and esm with ncc`,
    examples: [
      [`compile {package name}`, `yarn @bud compile @roots/bud-support`],
    ],
  }

  public package = Option.String('package to transpile', 'all')

  public async execute() {
    await this.$(
      `yarn ts-node --project ${tsConfig} ${ncc} ${this.package}`,
    )
  }
}
