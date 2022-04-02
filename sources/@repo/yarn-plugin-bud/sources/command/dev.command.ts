import {paths, REPO_PATH} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {join} from 'path'

import {Command} from './base.command'

const ncc = `${REPO_PATH}/sources/@repo/compile-kit/src/cjs @roots/bud-support`

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

  public ts = join(paths.config, 'tsconfig.json')

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

  public test = Option.Boolean('Run tests in watch mode alongside tsc')

  /**
   * @public
   */
  public async execute() {
    await this.$(`yarn ts-node --project ${this.ts} ${ncc}`)

    await this.$(
      `yarn tsc -b ${this.ts} --watch`,
      this.test ? `yarn @bud test all --watch` : ``,
    )
  }
}
