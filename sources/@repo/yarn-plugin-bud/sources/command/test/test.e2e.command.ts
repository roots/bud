/* eslint-disable no-console */
import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {ensureDir, rm} from 'fs-extra'
import {join} from 'path/posix'

import {Command} from '../base.command'

/**
 * Run tests
 */
export class TestE2E extends Command {
  /**
   * Command name
   */
  public static label = `@bud test`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `test`, `e2e`]]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run e2e tests`,
    examples: [[`run e2e tests`, `yarn @bud test e2e`]],
  }

  /**
   * --watch
   */
  public watch = Option.Boolean(`--watch`, false)

  /**
   * Variadic arguments
   */
  public passthrough = Option.Proxy({name: `vitest passthrough options`})

  /**
   * Execute command
   */
  public async execute() {
    this.log(`Preparing filesystem...`)
    await ensureDir(join(paths.root, `storage/mocks`))
    await rm(join(paths.root, `storage/mocks`), {recursive: true})

    await this.cli.run([`@bud`, `registry`, `clean`])
    await this.cli.run([`@bud`, `release`, `--tag`, `latest`])
    await this.cli.run([`@bud`, `registry`, `start`])

    try {
      await this.$([
        `yarn`,
        [
          `vitest`,
          `--config`,
          join(paths.root, `config/vitest.e2e.config.ts`),
          !this.watch ? `run` : ``,
        ],
        {stdout: this.context.stdout, stderr: this.context.stderr},
        true,
      ])
    } catch (e) {
      await this.cli.run([`@bud`, `registry`, `stop`])
      throw e
    }

    await this.cli.run([`@bud`, `registry`, `stop`])
  }
}
