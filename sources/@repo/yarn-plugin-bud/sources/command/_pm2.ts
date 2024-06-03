/* eslint-disable no-console */
import {path} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {noop} from 'lodash'

import {Command} from './base.command.js'

export class Pm2 extends Command {
  public static override paths: CommandClass['paths'] = [[`@bud`, `pm2`]]

  public static override usage: CommandClass['usage'] = {
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
      .catch(noop)
  }
}
