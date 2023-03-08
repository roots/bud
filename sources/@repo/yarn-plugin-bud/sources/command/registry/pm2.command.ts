/* eslint-disable no-console */
import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'
import {realpath} from 'fs-extra'

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
  public static label = `@bud pm2`

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
    await this.cli.run([`@bud`, `registry`, `install`])
    
    await this.tryExecuting(
      `node`,
      [
        `${paths.root}/storage/node_modules/pm2/bin/pm2`,
        ...(this.passthrough ?? []),
      ].filter(Boolean),
      {stdout: `ignore`, stderr: `ignore`},
    )
  }
}
