/* eslint-disable no-console */
import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import * as fs from 'fs-jetpack'
import {join} from 'path'

import {Command} from './base.command'

/**
 * Run tests
 */
export class TestRun extends Command {
  /**
   * Command name
   */
  public static label = `@bud test`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `test`],
    [`@bud`, `vitest`],
  ]

  /**
   * Configuration
   */
  public configuration = Option.String({
    required: true,
  })

  /**
   * Variadic arguments
   */
  public passthrough = Option.Proxy({name: `vitest passthrough options`})

  /**
   * Proxy tests
   */
  public get requiresProxy() {
    return [`integration`, `e2e`].includes(this.configuration)
  }

  /**
   * Execute command
   */
  public async execute() {
    if (this.requiresProxy) await this.setup()

    await this.$([
      `yarn`,
      [
        `vitest`,
        `--config`,
        join(paths.root, `config/vitest.${this.configuration}.config.ts`),
        ...(this.requiresProxy ? [`run`] : []),
        ...this.passthrough,
      ],
      {stdout: this.context.stdout, stderr: this.context.stderr},
      true,
    ])

    await this.teardown()
  }

  /**
   * Setup proxy
   */
  public async setup() {
    this.log(`Preparing filesystem...`)

    try {
      await fs.removeAsync(join(paths.root, `storage/mocks`))
    } catch (e) {}

    await this.cli.run([
      `@bud`,
      `release`,
      `--tag`,
      `latest`,
      `--registry`,
      `http://localhost:4873`,
    ])
  }

  /**
   * Teardown proxy
   */
  public async teardown() {
    await this.useNpmRegistry()
  }
}
