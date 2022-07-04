/* eslint-disable no-console */
import {execute} from '@yarnpkg/shell'
import {CommandClass} from 'clipanion'
import {ensureDir, ensureFile, remove} from 'fs-extra'

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
    examples: [
      [`start verdaccio server on 4873`, `yarn @bud registry start`],
    ],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    try {
      await ensureFile(`${process.cwd()}/storage/yarn.lock`)
      await ensureDir(`${process.cwd()}/storage/mocks`)
      await remove(`${process.cwd()}/storage/mocks`)
      this.log('integration tests directory cleaned')
    } catch (e) {}

    await this.tryExecuting(
      `npm`,
      [`install`, `--location=global`, `pm2`, `verdaccio`],
      {cwd: `${process.cwd()}/storage` as any},
    )
    this.log('made pm2 and verdaccio globally available')

    await this.tryExecuting(`pm2`, [
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

    await this.tryExecuting(`yarn`, [`@bud`, `release`, `--tag`, `latest`])
    this.log('released to registry')
  }

  /**
   * Attempt to execute a shell command
   *
   * @public
   */
  public async tryExecuting(bin: string, args: string[], opts: any = {}) {
    try {
      await execute(bin, args, opts)
    } catch (e) {
      console.error(e)
      console.info('bailing out 💥')
      await execute(`yarn`, [`@bud`, `registry`, `stop`])
    }
  }
}
