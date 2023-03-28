/* eslint-disable no-console */
import {paths} from '@repo/constants'
import {CommandClass} from 'clipanion'
import * as fs from 'fs-jetpack'
import {join} from 'path'

import {Command} from '../base.command'

/**
 * bud registry clean command class
 */
export class RegistryClean extends Command {
  /**
   * Command name
   */
  public static label = `@bud registry clean`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `registry`, `clean`],
  ]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `clean previously published packages`,
    examples: [
      [`clean previously published packages`, `yarn @bud registry clean`],
    ],
  }

  public async execute() {
    try {
      await fs.removeAsync(join(paths.root, `storage/mocks`))
    } catch (e) {}

    await fs.removeAsync(join(paths.root, `storage`, `packages`))

    const verdaccioDbExists = await fs.existsAsync(
      join(paths.root, `storage`, `.verdaccio-db.json`),
    )

    if (verdaccioDbExists) {
      const verdaccioDb = await fs.readAsync(
        join(paths.root, `storage`, `.verdaccio-db.json`),
        `json`,
      )
      verdaccioDb.list = []

      await fs.writeAsync(
        `${paths.root}/storage/.verdaccio-db.json`,
        verdaccioDb,
      )
    }
  }
}
