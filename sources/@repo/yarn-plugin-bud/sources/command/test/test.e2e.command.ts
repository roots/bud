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
  public passthrough = Option.Proxy({name: `jest passthrough options`})

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(
      this.withPassthrough(
        `yarn node --experimental-vm-modules ${join(
          paths.root,
          `node_modules/.bin/jest`,
        )} --config ${join(
          paths.root,
          `config/jest.config.js`,
        )} --selectProjects e2e --verbose --runInBand --testTimeout ${
          60 * 1000
        }`,
      ),
    )
  }
}
