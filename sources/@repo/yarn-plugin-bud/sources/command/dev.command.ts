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
  public static label = `@bud dev`

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
    examples: [
      [`run tsc, docusaurus & vitest in watch mode`, `yarn @bud dev`],
    ],
  }

  /**
   * @public
   */
  public async execute() {
    await this.$(`yarn @bud tsc`)

    await this.$(
      `yarn @bud tsc --watch`,
      `yarn @bud test unit`,
      `yarn @bud docs dev`,
    )
  }
}
