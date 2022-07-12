/* eslint-disable no-console */
import {paths} from '@repo/constants'
import {CommandClass} from 'clipanion'
import {ensureDir, readJson, remove, writeJson} from 'fs-extra'

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
  public static label = '@bud registry install'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `registry`, `install`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `install pm2 & verdaccio`,
    examples: [
      [`install pm2 and verdaccio`, `yarn @bud registry install`],
    ],
  }

  public async execute() {
    try {
      const verdaccioDb = await readJson(
        `${paths.root}/storage/.verdaccio-db.json`,
      )
      verdaccioDb.list = []
      await writeJson(
        `${paths.root}/storage/.verdaccio-db.json`,
        verdaccioDb,
      )
      await ensureDir(`${paths.root}/storage/packages`)
      await remove(`${paths.root}/storage/packages`)
    } catch (e) {
      throw new Error(e)
    }
  }
}
