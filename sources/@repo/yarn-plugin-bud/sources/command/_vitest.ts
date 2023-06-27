import {path} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Vitest extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `vitest`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud-tools`,
    description: `Run vitest`,
    examples: [[`Run vitest`, `yarn @bud vitest`]],
  }

  public configuration = Option.String({required: true})

  public passthrough = Option.Proxy({name: `vitest options`})

  public async execute() {
    const result = await this.cli
      .run(
        [
          `vitest`,
          `--config`,
          path(`config/vitest.${this.configuration}.config.ts`),
          ...this.passthrough,
        ].filter(Boolean),
      )
      .catch(error => {
        throw error
      })

    return result
  }
}
