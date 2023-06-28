import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import * as fs from 'fs-jetpack'
import {join} from 'path'

import {Command} from './base.command'

export class TestRun extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `test`]]

  public configuration = Option.String({required: true})

  public passthrough = Option.Proxy({name: `vitest passthrough options`})

  public async execute() {
    const args = [
      `@bud`,
      `vitest`,
      this.configuration,
      ...this.passthrough,
    ]

    if ([`e2e`, `integration`].includes(this.configuration)) {
      await fs
        .removeAsync(join(paths.root, `storage/mocks`))
        .catch(error => {
          this.result = 1
          throw error
        })

      await this.cli
        .run([
          `@bud`,
          `release`,
          `--tag`,
          `latest`,
          `--registry`,
          `http://localhost:4873/`,
        ])
        .catch(error => {
          this.result = 1
          throw error
        })
    }

    return await this.cli.run(args)
  }
}
