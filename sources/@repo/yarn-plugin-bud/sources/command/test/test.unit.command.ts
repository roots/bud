/* eslint-disable no-console */
import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {join} from 'path/posix'

import {Command} from '../base.command'

/**
 * Run tests
 */
export class TestUnit extends Command {
  /**
   * Command name
   */
  public static label = `@bud test unit`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `test`, `unit`]]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run unit tests`,
    examples: [[`run unit tests`, `yarn @bud test unit`]],
  }

  /**
   * Variadic arguments
   */
  public passthrough = Option.Proxy({name: `vitest passthrough options`})

  /**
   * Execute command
   */
  public async execute() {
    await this.$([
      `yarn`,
      [
        `vitest`,
        `--config`,
        join(paths.root, `config/vitest.unit.config.ts`),
      ],
      {stdout: this.context.stdout, stderr: this.context.stderr},
      true,
    ])
  }
}
