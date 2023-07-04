import {path} from '@repo/constants'
import {CommandClass} from 'clipanion'
import * as fs from 'fs-jetpack'

import {Command} from './base.command'

export class RegistryClean extends Command {
  public static paths: CommandClass['paths'] = [
    [`@bud`, `registry`, `clean`],
  ]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `clean previously published packages`,
    examples: [
      [`clean previously published packages`, `yarn @bud registry clean`],
    ],
  }

  public async execute() {
    await fs.removeAsync(path(`storage/mocks`)).catch(this.catch)
    await fs.removeAsync(path(`storage`, `packages`)).catch(this.catch)

    const verdaccioDbExists = await fs.existsAsync(
      path(`storage`, `.verdaccio-db.json`),
    )
    if (verdaccioDbExists) {
      const verdaccioDb = await fs
        .readAsync(path(`storage`, `.verdaccio-db.json`), `json`)
        .catch(this.catch)
      verdaccioDb.list = []
      await fs
        .writeAsync(path(`storage/.verdaccio-db.json`), verdaccioDb)
        .catch(this.catch)
    }
  }
}
