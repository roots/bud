import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {join} from 'path'

import {Command} from './base.command'

const tsConfig = join(paths.config, 'tsconfig.json')
const vendor = join(paths.sources, `@repo/compile-kit/src/vendor/index.ts`)

export class Vendor extends Command {
  public name = 'vendor'

  public static paths: CommandClass['paths'] = [[`@bud`, `vendor`]]
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `vendor a package`,
  }

  public request = Option.Rest()

  public async execute() {
    await this.$(
      `yarn ts-node --project ${tsConfig} ${vendor} ${this.request}`,
    )
  }
}
