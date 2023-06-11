/* eslint-disable no-console */
import {path} from '@repo/constants'
import {CommandClass} from 'clipanion'
import * as fs from 'fs-jetpack'

import {Command} from './base.command'

/**
 * bud registry clean command class
 */
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
    try {
      await this.promise(
        `Removing existing mocks`,
        `Existing mocks removed`,
        `Failed to remove existing mocks`,
        fs.removeAsync(path(`storage/mocks`)),
      )
    } catch (e) {
      throw e
    }

    try {
      await this.promise(
        `Removing existing local packages`,
        `Existing local packages removed`,
        `Failed to remove existing local packages`,
        fs.removeAsync(path(`storage`, `packages`)),
      )
    } catch (e) {
      throw e
    }

    const verdaccioDbExists = await fs.existsAsync(
      path(`storage`, `.verdaccio-db.json`),
    )

    if (verdaccioDbExists) {
      const verdaccioDb = await fs.readAsync(
        path(`storage`, `.verdaccio-db.json`),
        `json`,
      )
      verdaccioDb.list = []
      await fs.writeAsync(path(`storage/.verdaccio-db.json`), verdaccioDb)
    }
  }
}
