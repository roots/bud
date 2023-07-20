import {path} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Eslint command class
 */
export class Eslint extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `eslint`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Eslint passthrough`,
    examples: [[`eslint usage info`, `yarn @bud eslint --help`]],
  }

  public passthrough = Option.Proxy({name: `pm2 options`})

  public async execute() {
    await this.cli
      .run([
        `node`,
        path(`node_modules`, `.bin`, `eslint`),
        path(`examples/**/*.{ts,tsx,js,jsx}`),
        path(`sources/**/src/**/*.{ts,tsx,js,jsx}`),
        path(`tests/**/*.{ts,tsx,js,jsx}`),
        path(`config/**/*.{ts,tsx,js,jsx}`),
        `--config`,
        path(`config/eslint.config.cjs`),
        `--no-error-on-unmatched-pattern`,
        ...this.passthrough,
      ])
      .then(this.throwIfError)
      .catch(this.catch)
  }
}
