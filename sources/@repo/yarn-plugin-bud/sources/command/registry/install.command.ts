/* eslint-disable no-console */
import {paths} from '@repo/constants'
import {CommandClass} from 'clipanion'
import {realpath} from 'fs-extra'
import { join } from 'path'

import {Command} from '../base.command'

/**
 * `@bud registry start` command class
 *
 * @internal
 */
export class RegistryInstall extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud registry install`

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
    let pm2Binary: string | false = false

    try {
      pm2Binary = await realpath(
        join(paths.root, `storage/node_modules/pm2/bin/pm2`),
      )
    } catch {}

    if (!pm2Binary) {
      await this.tryExecuting(`npm`, [`install`, `pm2`, `verdaccio`], {
        cwd: join(paths.root, `storage`),
      })
    }
  }
}
