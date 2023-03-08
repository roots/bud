/* eslint-disable no-console */
import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {ensureDir, ensureFile, remove} from 'fs-extra'
import {join} from 'path/posix'

import {Command} from '../base.command'

/**
 * Run tests
 *
 * @internal
 */
export class TestUnit extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud test unit`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `test`, `unit`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run unit tests`,
    examples: [[`run unit tests`, `yarn @bud test unit`]],
  }

  /**
   * Variadic arguments
   *
   * @internal
   */
  public passthrough = Option.Proxy({name: `vitest passthrough options`})

  /**
   * Execute command
   *
   * @internal
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
