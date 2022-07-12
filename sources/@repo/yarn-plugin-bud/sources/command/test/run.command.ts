/* eslint-disable no-console */
import {REPO_PATH} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {ensureDir, ensureFile, remove} from 'fs-extra'

import {Command} from '../base.command'

/**
 * Run tests
 *
 * @internal
 */
export class TestRun extends Command {
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
  public static paths: CommandClass['paths'] = [
    [`@bud`, `test`, `run`],
    [`@bud`, `test`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run tests`,
    examples: [
      [`run e2e tests`, `yarn @bud test e2e`],
      [`run unit tests`, `yarn @bud test unit`],
      [`run integration tests`, `yarn @bud test integration`],
    ],
  }

  /**
   * Variadic arguments
   *
   * @internal
   */
  public passthrough = Option.Proxy({name: `jest params`})

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    if (this.passthrough.includes('integration')) {
      await ensureFile(`${REPO_PATH}/storage/yarn.lock`)
      await ensureDir(`${REPO_PATH}/storage/mocks`)
      await remove(`${REPO_PATH}/storage/mocks`)
      this.log('integration tests directory cleaned')
    }

    await this.tryExecuting(`yarn`, [
      `node`,
      `--experimental-vm-modules`,
      `./node_modules/.bin/jest`,
      `--config`,
      `./config/jest.config.js`,
      ...(this.passthrough ?? []),
    ])
  }
}
