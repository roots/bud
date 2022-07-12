/* eslint-disable no-console */
import {paths} from '@repo/constants'
import {CommandClass} from 'clipanion'
import {realpath} from 'fs-extra'

import {Command} from '../base.command'

/**
 * `@bud registry start` command class
 *
 * @internal
 */
export class RegistryStart extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = '@bud registry start'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `registry`, `start`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `start verdaccio registry`,
    examples: [[`start verdaccio server`, `yarn @bud registry start`]],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    const pm2BinaryAvailable = await realpath(
      `${paths.root}/storage/node_modules/pm2/bin/pm2`,
    )

    if (!pm2BinaryAvailable) {
      await this.tryExecuting(`yarn`, [`@bud`, `registry`, `install`])
    }

    await this.tryExecuting(`yarn`, [
      `@bud`,
      `pm2`,
      `start`,
      `${paths.root}/storage/node_modules/.bin/verdaccio`,
      `--`,
      `--config=${paths.root}/config/verdaccio/config.yaml`,
    ])

    await this.tryExecuting(`yarn`, [
      `config`,
      `set`,
      `unsafeHttpWhitelist`,
      `--json`,
      `["0.0.0.0","localhost"]`,
    ])
    await this.tryExecuting(`yarn`, [
      `config`,
      `set`,
      `npmPublishRegistry`,
      `http://0.0.0.0:4873`,
    ])
    await this.tryExecuting(`yarn`, [
      `config`,
      `set`,
      `npmRegistryServer`,
      `http://0.0.0.0:4873`,
    ])
  }
}
