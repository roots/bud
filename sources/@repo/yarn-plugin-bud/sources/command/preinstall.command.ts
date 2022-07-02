import {execute} from '@yarnpkg/shell'
import {CommandClass} from 'clipanion'
import {ensureFile} from 'fs-extra'
import {bind} from 'helpful-decorators'

import {Command} from './base.command'

/**
 * Publish command class
 *
 * @internal
 */
export class Preinstall extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'preinstall'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [['@bud', 'preinstall']]

  /**
   * Execute command
   *
   * @internal
   */
  @bind
  public async execute() {
    try {
      await ensureFile(`${process.cwd()}/storage/yarn.lock`)
    } catch (e) {
      this.errorHandler(e)
    }

    await execute(
      `npm`,
      [`install`, `--location=global`, `pm2`, `verdaccio`],
      {cwd: `${process.cwd()}/storage` as any},
    )

    await execute(`pm2`, [
      `start`,
      `verdaccio`,
      `--`,
      `--config=./config/verdaccio/config.yaml`,
    ])
  }
}
