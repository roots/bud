import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Format command class
 *
 * @internal
 */
export class Format extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = '@bud format'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `format`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Run coding style linters`,
    examples: [
      [`run prettier`, `yarn @bud format`],
      [`run prettier (no fix)`, `yarn @bud format --no-fix`],
    ],
  }

  /**
   * `--fix` option
   *
   * @internal
   */
  public fix = Option.Boolean('-f,--fix', true, {
    description: 'fix',
  })

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(
      `yarn prettier ./sources/@roots/*/src/**/* ${
        this.fix ? '--write' : ''
      } --config ./config/prettier.config.cjs --ignore-unknown --no-error-on-unmatched-pattern`,

      `yarn prettier ./sources/@roots/*/lib/**/* ${
        this.fix ? '--write' : ''
      } --config ./config/prettier.config.cjs --write --ignore-unknown --no-error-on-unmatched-pattern`,

      `yarn prettier ./sources/@roots/*/types/**/*.d.ts ${
        this.fix ? '--write' : ''
      } --config ./config/prettier.config.cjs --write --ignore-unknown --no-error-on-unmatched-pattern`,
    )
  }
}
