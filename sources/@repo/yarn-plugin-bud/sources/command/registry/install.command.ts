/* eslint-disable no-console */
import {REPO_PATH} from '@repo/constants'
import {CommandClass} from 'clipanion'
import {ensureDir, ensureFile, remove} from 'fs-extra'

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
      await ensureFile(`${REPO_PATH}/storage/yarn.lock`)
      await ensureDir(`${REPO_PATH}/storage/mocks`)
      await remove(`${REPO_PATH}/storage/mocks`)
      this.log('integration tests directory cleaned')
    } catch (e) {}

    await this.tryExecuting(`npm`, [`install`, `pm2`, `verdaccio`], {
      cwd: `${REPO_PATH}/storage` as any,
    })
  }
}
