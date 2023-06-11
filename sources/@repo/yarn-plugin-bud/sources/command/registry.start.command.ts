/* eslint-disable no-console */
import {path} from '@repo/constants'
import {CommandClass} from 'clipanion'

import {Command} from './base.command'

/**
 * bud registry start command class
 */
export class RegistryStart extends Command {
  public static paths: CommandClass['paths'] = [
    [`@bud`, `registry`, `start`],
  ]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `start verdaccio registry`,
    examples: [[`start verdaccio server`, `yarn @bud registry start`]],
  }

  public async execute() {
    try {
      await this.cli.run([
        `@bud`,
        `pm2`,
        `start`,
        path(`node_modules`, `verdaccio`, `build`, `lib`, `cli`, `cli.js`),
        `-n`,
        `verdaccio`,
        `--`,
        `--config`,
        path(`config`, `verdaccio`, `config.yaml`),
      ])
    } catch {}

    try {
      await this.cli.run([`@bud`, `pm2`, `save`])
    } catch {}
  }
}
