import {path} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Prettier command class
 */
export class Prettier extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `prettier`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Prettier passthrough`,
    examples: [[`prettier usage info`, `yarn @bud prettier --help`]],
  }

  public passthrough = Option.Proxy({name: `prettier options`})

  public async execute() {
    if (!this.passthrough.length) {
      this.passthrough = [
        `--ignore-unknown`,
        `--no-error-on-unmatched-pattern`,
        `--write`,
      ]
    }

    await this.cli
      .run([
        `node`,
        path(`node_modules/.bin/prettier`),
        path(`sources/@roots/*/src/**/*`),
        `--config=${path(`config`, `prettier.config.js`)}`,
        `--ignore-unknown`,
        `--no-error-on-unmatched-pattern`,
        `--write`,
        ...this.passthrough,
      ])
      .then(this.throwIfError)
      .catch(this.catch)
  }
}
