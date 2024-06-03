import {path} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import * as fs from 'fs-jetpack'

import {Command} from './base.command.js'

export class TestRun extends Command {
  public static override paths: CommandClass['paths'] = [[`@bud`, `test`]]

  public static override usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run test suites`,
    examples: [
      [`run unit test suite`, `yarn @bud test unit`],
      [`run integration test suite`, `yarn @bud test integration`],
      [`run e2e test suite`, `yarn @bud test e2e`],
    ],
  }

  public configuration = Option.String({required: true})

  public passthrough = Option.Proxy({name: `vitest passthrough options`})

  public async execute() {
    const args = [`@bud`, `vitest`]

    await fs.removeAsync(path(`storage`, `mocks`)).catch(error => {
      throw error
    })

    if ([`e2e`, `integration`].includes(this.configuration)) {
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
          throw error
        })
    }

    !args.includes(`--config`) &&
      args.push(
        `--config`,
        path(`config`, `vitest`, `config.${this.configuration}.ts`),
      )

    args.push(...this.passthrough)

    return await this.cli.run(args)
  }
}
