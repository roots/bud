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
export class TestE2E extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud test`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `test`, `e2e`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run e2e tests`,
    examples: [[`run e2e tests`, `yarn @bud test e2e`]],
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
    await this.$(`yarn @bud registry start`)
    await this.$(`yarn @bud registry clean`)
    await this.$(`yarn @bud release --tag latest`)

    try {
      await this.$(
        this.withPassthrough(
          `yarn vitest --config ${join(
            paths.root,
            `config/vitest.e2e.config.ts`,
          )}`,
        ),
      )
    } catch (e) {
      await this.$(`yarn @bud registry stop`)
    }

    await this.$(`yarn @bud registry stop`)
  }
}
