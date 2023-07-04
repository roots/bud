/* eslint-disable no-console */
import {path} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Pm2 extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `pm2`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `registry access`,
    examples: [[`pm2 usage info`, `yarn @bud pm2 --info`]],
  }

  public passthrough = Option.Proxy({name: `pm2 options`})

  public async execute() {
    await this.cli
      .run([
        `node`,
        path(`node_modules`, `.bin`, `pm2`),
        ...this.passthrough,
      ])
      .then(this.throwIfError)
      .catch(this.catch)
  }
}
