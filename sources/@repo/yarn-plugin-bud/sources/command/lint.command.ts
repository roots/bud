import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Lint command class
 */
export class Lint extends Command {
  /**
   * Command name
   */
  public static label = `@bud lint`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `lint`], [`@bud`, `eslint`], [`lint`]]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run eslint`,
    examples: [[`run eslint`, `yarn @bud lint`]],
  }

  /**
   * Execute command
   */
  public async execute() {
    await this.$([
      `yarn`,
      [
        `eslint`,
        `./sources/*/*/src/**/*.{ts,tsx,js,jsx}`,
        `./sources/*/*/sources/**/*.{ts,tsx,js,jsx}`,
        `./tests/**/*.{ts,tsx,js,jsx}`,
        `./config/**/*.{ts,tsx,js,jsx}`,
        `--config`,
        `./config/eslint.config.cjs`,
        `--no-error-on-unmatched-pattern`,
        ...this.passthrough ?? [],
      ],
      {stderr: this.context.stderr},
    ])
  }
}
