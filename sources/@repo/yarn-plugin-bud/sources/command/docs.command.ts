import {REPO_ROOT} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'

import {TS_CONFIG_PATH} from '../constants'
import {Command} from './base.command'

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
  public name = 'docs'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [['@bud', 'docs']]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: '@bud',
    description:
      'build docs and readme files. no flags builds everything. running with the --site flag will also build api docs.',
    examples: [
      ['build all', 'yarn @bud docs'],
      ['build api documentation', 'yarn @bud docs --api'],
      ['build api documentation and site files', 'yarn @bud docs --site'],
      ['build readme files', 'yarn docs --readme'],
    ],
  }

  /**
   * --api option
   *
   * @internal
   */
  public api = Option.Boolean('-a,--api', false, {
    description: 'build api docs',
  })

  /**
   * --site option
   *
   * @internal
   */
  public site = Option.Boolean('-s,--site', false, {
    description: 'build site files',
  })

  /**
   * --readme option
   *
   * @internal
   */
  public readme = Option.Boolean('-r,--readme', false, {
    description: 'build readme files',
  })

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    const all = !this.site && !this.readme && !this.api

    if (all || this.api) {
      /**
       * Generate API docs
       */
      await this.$(
        `typedoc \
          --out ./sources/@repo/docs/dev/api \
          --tsconfig ./config/tsconfig.json \
          --entryPointStrategy expand \
          --entryPoints \
            ./sources/@roots/bud-framework/src/index.ts \
            ./sources/@roots/container/src/index.ts`,
      )
    }

    if (all || this.site) {
      /**
       * Build docs site cli examples
       */
      await this.$(
        `yarn ts-node-transpile-only --project ${TS_CONFIG_PATH} ./sources/@repo/markdown-kit/cli-examples`,
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
        `yarn ts-node-transpile-only --project ${TS_CONFIG_PATH} ./sources/@repo/markdown-kit/readme`,
      )
    }

    return
  }
}
