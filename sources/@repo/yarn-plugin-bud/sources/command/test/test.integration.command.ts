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
export class TestIntegration extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud test integration`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `test`, `integration`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run integration tests`,
    examples: [[`run integration tests`, `yarn @bud test integration`]],
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
    await ensureFile(join(paths.root, `storage/yarn.lock`))
    await ensureDir(join(paths.root, `storage/mocks`))
    await remove(join(paths.root, `storage/mocks`))
    this.log('integration tests directory cleaned')

    await this.$(
      `yarn node --experimental-vm-modules ${join(
        paths.root,
        `node_modules/.bin/jest`,
      )} ${this.passthrough ?? ''} --config ${join(
        paths.root,
        `config/jest.config.js`,
      )} --selectProjects integration --verbose --testTimeout ${
        60 * 1000
      }`,
    )
  }
}
