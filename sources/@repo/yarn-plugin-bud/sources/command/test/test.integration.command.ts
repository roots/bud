/* eslint-disable no-console */
import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {ensureDir, ensureFile, remove} from 'fs-extra'
import {join} from 'path/posix'

import {Command} from '../base.command'

/**
 * Run tests
 */
export class TestIntegration extends Command {
  /**
   * Command name
   */
  public static label = `@bud test integration`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `test`, `integration`],
  ]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run integration tests`,
    examples: [[`run integration tests`, `yarn @bud test integration`]],
  }

  /**
   * Variadic arguments
   */
  public passthrough = Option.Proxy({name: `jest passthrough options`})

  /**
   * Execute command
   */
  public async execute() {
    await ensureFile(join(paths.root, `storage/yarn.lock`))
    await ensureDir(join(paths.root, `storage/mocks`))
    await remove(join(paths.root, `storage/mocks`))

    this.log(`integration tests directory cleaned`)

    await this.$(`yarn @bud registry start`)
    await this.$(`yarn @bud registry clean`)
    await this.$(`yarn @bud release --tag latest`)

    try {
      await this.$(
        this.withPassthrough(
          `yarn vitest --config ${join(
            paths.root,
            `config/vitest.integration.config.js`,
          )}`,
        ),
      )
    } catch (e) {}

    await this.$(`yarn @bud registry stop`)
  }
}
