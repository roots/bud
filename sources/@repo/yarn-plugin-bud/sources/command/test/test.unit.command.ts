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
        )} ${this.passthrough.reduce(
          (a, c) => `${a} ${c}`,
          ``,
        )} --config ${join(
          paths.root,
          `config/jest.config.js`,
        )} --selectProjects unit:node unit:dom --verbose --coverage`,
      ),
    )
  }
}
