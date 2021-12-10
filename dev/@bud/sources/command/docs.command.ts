import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Docs command class
 *
 * @internal
 */
export class Docs extends Command {
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

    if (this.api || this.site || all) {
      await this.$('yarn node ./site/api-documenter.build.js')
    }

    await this.$(
      ...[
        this.site || all
          ? 'yarn workspace @roots/bud-docs run docusaurus build'
          : null,
        this.readme || all
          ? 'yarn ts-node-transpile-only --project ./config/tsconfig.json ./dev/readme'
          : null,
      ].filter(Boolean),
    )
  }
}
