/* eslint-disable no-console */
import {execute} from '@yarnpkg/shell'
import {CommandClass, Option} from 'clipanion'
import {ensureDir, ensureFile, remove, rmdir} from 'fs-extra'

import {Command} from './base.command'

/**
 * Run tests
 *
 * @internal
 */
export class Test extends Command {
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
   * Integration tests are running
   *
   * @internal
   */
  public get isIntegration() {
    return (
      !this.passthrough ||
      this.passthrough.length === 0 ||
      this.passthrough.filter(arg => arg.includes('integration')).length >
        0
    )
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    if (this.isIntegration) {
      await this.tryExecuting(`yarn`, [`@bud`, `registry`, `start`])
    }

    await this.tryExecuting(`yarn`, [
      `node`,
      `--experimental-vm-modules`,
      `./node_modules/.bin/jest`,
      `--config`,
      `./config/jest.config.js`,
      ...(this.passthrough ?? []),
    ])

    await this.teardown()
  }

  /**
   * Try executing a shell command
   *
   * @internal
   */
  public async tryExecuting(bin: string, args: string[], opts: any = {}) {
    try {
      await execute(bin, args, opts)
    } catch (e) {
      console.error(e)
      await this.teardown()
      process.exit(1)
    }
  }

  /**
   * Teardown infrastructure
   *
   * @internal
   */
  public async teardown() {
    if (this.isIntegration) {
      await execute(`yarn`, [`@bud`, `registry`, `stop`])
    }
  }
}
