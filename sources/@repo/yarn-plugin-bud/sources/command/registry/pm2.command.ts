/* eslint-disable no-console */
import {REPO_PATH} from '@repo/constants'
import {execute} from '@yarnpkg/shell'
import {CommandClass, Option} from 'clipanion'
import {ensureDir, ensureFile, realpath} from 'fs-extra'

import {Command} from '../base.command'

/**
 * `@bud registry start` command class
 *
 * @internal
 */
export class Pm2 extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = '@bud pm2'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `pm2`]]

  /**
   * Variadic arguments
   *
   * @internal
   */
  public passthrough = Option.Proxy({name: `pm2 options`})

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `registry access`,
    examples: [[`work with pm2`, `yarn @bud pm2`]],
  }

  public async execute() {
    const pm2BinaryAvailable = await realpath(
      `${REPO_PATH}/storage/node_modules/pm2/bin/pm2`,
    )

    if (!pm2BinaryAvailable) {
      await this.tryExecuting(`yarn`, [`@bud`, `registry`, `install`])
    }

    await this.tryExecuting(`node`, [
      `${REPO_PATH}/storage/node_modules/pm2/bin/pm2`,
      ...this.passthrough,
    ])
  }
}
