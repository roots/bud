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
    const paths: Array<string> = await this.promise(
      `Finding files to remove`,
      `Found files to remove`,
      `No files to remove`,
      globby([
        path(`node_modules`),
        path(`sources/@roots/*/lib`),
        path(`sources/@roots/*/node_modules`),
        path(`sources/@roots/*/node_modules`),
        path(`sources/@roots/*/node_modules`),
        path(`sources/@roots/*/tsconfig.tsbuildinfo`),
        path(`storage/mocks`),
        path(`storage/packages`),
        path(`storage/yarn`),
        path(`storage/.verdaccio-db.json`),
      ]),
    )

    await this.promise(
      `Removing found files`,
      `Removed found files`,
      `No files to remove`,
      Promise.all(paths.map(async path => await fs.removeAsync(path))),
    )
  }
}
