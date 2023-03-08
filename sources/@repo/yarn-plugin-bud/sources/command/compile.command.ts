import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {join} from 'path'

import {Command} from './base.command'

const tsConfig = join(paths.config, `tsconfig.json`)
const ncc = join(paths.sources, `@repo/compile-kit/src/cjs`)

/**
 * Compile command
 */
export class Compile extends Command {
  /**
   * Command name
   */
  public static label = `@bud compile`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `compile`]]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `compile a package`,
    details: `compiles package with vercel/ncc`,
    examples: [
      [`compile {package name}`, `yarn @bud compile @roots/bud-react`],
    ],
  }

  /**
   * `--package` option
   */
  public package = Option.String(`package to transpile`, `all`)

  /**
   * Command execute
   */
  public async execute() {
    await this.$(
      `yarn ts-node --project ${tsConfig} ${ncc} ${this.package}`,
    )
  }
}
