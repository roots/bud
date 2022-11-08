import * as repo from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {copy} from 'fs-extra'

import {Command} from '../base.command'

/**
 * Docs command class
 *
 * @internal
 */
export class Docs extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud docs`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `docs`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `build docs and readme.`,
    examples: [
      [`build all`, `yarn @bud docs`],
      [`build api documentation`, `yarn @bud docs --api`],
      [`build api documentation and site files`, `yarn @bud docs --site`],
      [`build readme files`, `yarn @bud docs --readme`],
    ],
  }

  /**
   * --api option
   *
   * @internal
   */
  public api = Option.Boolean(`-a,--api`, false, {
    description: `build api docs`,
  })

  /**
   * --site option
   *
   * @internal
   */
  public site = Option.Boolean(`-s,--site`, false, {
    description: `build site files`,
  })

  /**
   * --readme option
   *
   * @internal
   */
  public readme = Option.Boolean(`-r,--readme`, false, {
    description: `build readme files`,
  })

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    const all = !this.site && !this.readme && !this.api

    /**
     * Build docs site cli examples
     */
    if (all || this.site) {
      // run cli-examples generator
      await this.$(
        `yarn node ${repo.paths.sources}/@repo/markdown-kit/compiled/cli-examples/index.js`,
      )

      /**
       * Build docs
       */
      await this.$(`yarn workspace @repo/docs run build`)
    }

    if (all || this.readme) {
      /**
       * Build repo readmes
       */
      await this.$(
        `yarn node ${repo.paths.sources}/@repo/markdown-kit/compiled/readme/index.js`,
      )
    }

    return
  }
}
