import {execute} from '@yarnpkg/shell'
import {CommandClass} from 'clipanion'
import {ensureFile, remove} from 'fs-extra'
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
  public static label = '@bud preinstall'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [['@bud', 'preinstall']]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Preinstallation script for repo development`,
    details: `
# Pre-installation

This script will install the required dependencies for the repo to work.
It will also start the verdaccio server with pm2.

## Notes

This command will install the following packages globally:
  - pm2
  - verdaccio

You can stop the verdaccio server with the pm2 cli:
\`pm2 stop verdaccio\`
    `,
    examples: [[`run preinstallation script`, `yarn @bud preinstall`]],
  }

  /**
   * Execute command
   *
   * @internal
   */
  @bind
  public async execute() {
    try {
      await ensureFile(`${process.cwd()}/storage/yarn.lock`)
    } catch (e) {}

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

    try {
      await remove(`${process.cwd()}/storage`)
    } catch (e) {}
  }
}
