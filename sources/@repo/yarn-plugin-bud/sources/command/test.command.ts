/* eslint-disable no-console */
import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import * as fs from 'fs-jetpack'
import {join} from 'path'

import {Command} from './base.command'

export class TestRun extends Command {
  public static paths: CommandClass['paths'] = [
    [`@bud`, `test`],
    [`@bud`, `vitest`],
  ]

  public configuration = Option.String({required: true})

  public passthrough = Option.Proxy({name: `vitest passthrough options`})

  public async execute() {
    if (this.requiresSetup) await this.setup()

    try {
      await this.cli.run(
        [
          `vitest`,
          `--config`,
          join(
            paths.root,
            `config/vitest.${this.configuration}.config.ts`,
          ),
          ...(this.requiresSetup ? [`run`] : []),
          ...this.passthrough,
        ].filter(Boolean),
      )
    } catch (e) {
      throw e
    }
  }

  public get requiresSetup() {
    return [`e2e`, `integration`].includes(this.configuration)
  }

  public async setup() {
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
}
