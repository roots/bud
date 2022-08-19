/* eslint-disable no-console */
import {paths} from '@repo/constants'
import {CommandClass} from 'clipanion'
import {ensureDir, pathExists, readJson, remove, writeJson} from 'fs-extra'
import {join} from 'path'

import {Command} from '../base.command'

/**
 * `@bud registry start` command class
 *
 * @internal
 */
export class RegistryClean extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud registry clean`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `registry`, `clean`],
  ]

  /**
   * Command usage
   *
   * @internal
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
      await ensureDir(join(paths.root, `storage`, `packages`))
      await remove(join(paths.root, `storage`, `packages`))

      const verdaccioDbExists = await pathExists(
        join(paths.root, `storage`, `.verdaccio-db.json`),
      )

      if (verdaccioDbExists) {
        const verdaccioDb = await readJson(
          join(paths.root, `storage`, `.verdaccio-db.json`),
        )
        verdaccioDb.list = []

        await writeJson(
          `${paths.root}/storage/.verdaccio-db.json`,
          verdaccioDb,
        )
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}
