import * as repo from '@repo/constants'
import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

/**
 * Docs command class
 */
export class Docs extends Command {
  /**
   * Command name
   */
  public static label = `@bud docs`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `docs`]]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `build docs and readme.`,
    examples: [
      [`build all`, `yarn @bud docs`],
      [`build api documentation and site files`, `yarn @bud docs --site`],
      [`build readme files`, `yarn @bud docs --readme`],
    ],
  }

  /**
   * --site option
   */
  public site = Option.Boolean(`-s,--site`, false, {
    description: `build site files`,
  })

  /**
   * --readme option
   */
  public readme = Option.Boolean(`-r,--readme`, false, {
    description: `build readme files`,
  })

  /**
   * Execute command
   */
  public async execute() {
    const all = !this.site && !this.readme

    await this.$(`yarn workspace @repo/markdown-kit build`)

    /**
     * Build docs site cli examples
     */
    if (all || this.site) {
      // run cli-examples generator
      await this.$(
        `yarn node ${repo.paths.sources}/@repo/markdown-kit/compiled/cli-examples/index.js`,
      )

      try {
        await this.$(
          `yarn node ${repo.paths.sources}/@repo/markdown-kit/compiled/releases/index.js`,
        )
      } catch (error) {}

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
