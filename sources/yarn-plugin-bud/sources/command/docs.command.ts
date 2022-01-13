import {CommandClass, Option} from 'clipanion'

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
      [
        'build api documentation and site files',
        'yarn @bud docs --site',
      ],
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

    if (all) {
      await this.$(
        `yarn ts-node ./dev/site/api-documenter.build.js`,
        `yarn ts-node ./dev/site/cli-examples`,
      )
      await this.$(
        `yarn workspace @roots/bud-docs run docusaurus build`,
        `yarn ts-node-transpile-only --project ./config/tsconfig.json ./dev/readme`,
      )
      return
    }

    if (this.api || this.site) {
      await this.$(
        `yarn ts-node ./dev/site/api-documenter.build.js`,
      )
    }

    if (this.site) {
      await this.$(`yarn ts-node ./dev/site/cli-examples`)
      await this.$(
        `yarn workspace @roots/bud-docs run docusaurus build`,
      )
    }

    if (this.readme) {
      await this.$(
        `yarn ts-node-transpile-only --project ./config/tsconfig.json ./dev/readme`,
      )
    }
  }
}
