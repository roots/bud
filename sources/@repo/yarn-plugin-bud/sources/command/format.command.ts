import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Format command class
 */
export class Format extends Command {
  /**
   * Command name
   */
  public static label = `@bud lint format`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `format`],
    [`@bud`, `prettier`],
  ]

  /**
   * Command usage
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
   */
  public fix = Option.Boolean(`-f,--fix`, true, {
    description: `fix`,
  })

  /**
   * Variadic arguments
   */
  public passthrough = Option.Proxy({name: `prettier options`})

  /**
   * Execute command
   */
  public async execute() {
    await this.$([
      `yarn`,
      [
        `prettier`,
        `./sources/@roots/*/src/**/*`,
        this.fix ? `--write` : `--check`,
        `--config`,
        `./config/prettier.config.cjs`,
        `--ignore-unknown`,
        `--no-error-on-unmatched-pattern`,
        ...(this.passthrough ?? []),
      ],
    ])
  }
}
