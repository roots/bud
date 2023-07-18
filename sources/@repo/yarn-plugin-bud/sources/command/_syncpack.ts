import {path} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Syncpack command class
 */
export class Syncpack extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `syncpack`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Syncpack passthrough`,
    examples: [[`syncpack usage info`, `yarn @bud syncpack --help`]],
  }

  public passthrough = Option.Proxy({name: `pm2 options`})

  public async execute() {
    await this.cli
      .run([
        `node`,
        path(`node_modules`, `.bin`, `syncpack`),
        `list-mismatches`,
        `--config`,
        path(`config/syncpack.config.cjs`),
      ])
      .then(this.throwIfError)
      .catch(this.catch)
  }
}
