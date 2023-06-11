import {path} from '@repo/constants'
import {CommandClass} from 'clipanion'
import * as fs from 'fs-jetpack'
import {globby} from 'globby'

import {Command} from './base.command'

export class Clean extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `clean`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `clean project artifacts`,
    examples: [[`clean project artifacts`, `yarn @bud clean`]],
  }

  public async execute() {
    await this.removeMatchingPaths(
      `node_modules`,
      `sources/@roots/*/lib`,
      `sources/@roots/*/node_modules`,
      `sources/@roots/*/node_modules`,
      `sources/@roots/*/node_modules`,
      `sources/@roots/*/tsconfig.tsbuildinfo`,
      `storage/mocks`,
      `storage/packages`,
      `storage/yarn`,
      `storage/.verdaccio-db.json`,
    )
  }

  public async removeMatchingPaths(...patterns: Array<string>) {
    return globby(patterns.map(location => path(location))).then(
      async paths =>
        await Promise.all(paths.map(async path => fs.removeAsync(path))),
    )
  }
}
