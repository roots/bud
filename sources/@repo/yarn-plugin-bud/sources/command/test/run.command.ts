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
  public static paths: CommandClass['paths'] = [[`@bud`, `test`]]

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

  public select = Option.String({
    name: 'selectProjects',
    required: true,
  })

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
    if (this.passthrough.includes('integration')) {
      await ensureFile(join(paths.root, `storage/yarn.lock`))
      await ensureDir(join(paths.root, `storage/mocks`))
      await remove(join(paths.root, `storage/mocks`))
      this.log('integration tests directory cleaned')
    }

    await this.tryExecuting(`yarn`, [
      `node`,
      `--experimental-vm-modules`,
      join(paths.root, `node_modules/.bin/jest`),
      `--config`,
      join(paths.root, `config/jest.config.js`),
      `--selectProjects`,
      this.select,
      ...(this.passthrough ?? []),
    ])
  }
}
