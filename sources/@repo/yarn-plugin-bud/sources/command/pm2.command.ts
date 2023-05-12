/* eslint-disable no-console */
import {paths} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * bud pm2 command class
 */
export class Pm2 extends Command {
  /**
   * Command name
   */
  public static label = `@bud pm2`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `pm2`]]

  /**
   * Variadic arguments
   */
  public passthrough = Option.Proxy({name: `pm2 options`})

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `registry access`,
    examples: [[`work with pm2`, `yarn @bud pm2`]],
  }

  /**
   * Execute command
   */
  public async execute() {
    try {
      await this.$([
        `yarn`,
        [`pm2`, ...(this.passthrough ?? [])].filter(Boolean),
      ])
    } catch (e) {}
  }
}
