/* eslint-disable no-console */
import {CommandClass} from 'clipanion'

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
    await this.tryExecuting(`yarn`, [
      `@bud`,
      `pm2`,
      `start`,
      `verdaccio`,
      `--`,
      `--config=./config/verdaccio/config.yaml`,
    ])
    this.log('started verdaccio')

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

    await this.tryExecuting(`yarn`, [`install`])
    this.log('installed via registry')

    await this.tryExecuting(`yarn`, [`@bud`, `tsc`, `--force`])

    await this.tryExecuting(`yarn`, [`@bud`, `release`, `--tag`, `latest`])
    this.log('released to registry')
  }
}
