/* eslint-disable no-console */
import {execute} from '@yarnpkg/shell'
import {CommandClass} from 'clipanion'
import {ensureDir, remove} from 'fs-extra'

import {Command} from '../base.command'

/**
 * `@bud registry stop` command class
 *
 * @internal
 */
export class RegistryStop extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = '@bud registry stop'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `registry`, `stop`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `stop verdaccio registry`,
    examples: [
      [`stop verdaccio server on 4873`, `yarn @bud registry stop`],
    ],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    try {
      await execute(`pm2`, [`stop`, `verdaccio`])
      this.log('registry stopped')

      await execute(`pm2`, ['delete', 'verdaccio'])
      this.log('registry deleted')
    } catch (e) {}

    try {
      await execute(`yarn`, [`config`, `unset`, `unsafeHttpWhitelist`])
      await execute(`yarn`, [`config`, `unset`, `npmPublishRegistry`])
      await execute(`yarn`, [`config`, `unset`, `npmRegistryServer`])
    } catch (e) {}

    try {
      await ensureDir(`${process.cwd()}/storage/mocks`)
      await remove(`${process.cwd()}/storage/mocks`)
      await remove(`${process.cwd()}/storage/yarn.lock`)
      this.log('filesystem cleaned')
    } catch (e) {}
  }
}
