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
    const args = [`@bud`, `vitest`, this.configuration]

    if ([`e2e`, `integration`].includes(this.configuration)) {
      args.push(`run`)

      await fs.removeAsync(join(paths.root, `storage/mocks`))

      await this.cli.run([
        `@bud`,
        `release`,
        `--tag`,
        `latest`,
        `--registry`,
        `http://localhost:4873`,
      ])
    }

    try {
      await this.cli.run([...args, ...this.passthrough].filter(Boolean))
    } catch (error) {
      throw error
    }
  }
}
