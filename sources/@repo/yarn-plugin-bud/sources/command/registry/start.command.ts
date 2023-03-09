/* eslint-disable no-console */
import {paths} from '@repo/constants'
import {CommandClass} from 'clipanion'
import {join} from 'path'

import {Command} from '../base.command'

/**
 * bud registry start command class
 */
export class RegistryStart extends Command {
  /**
   * Command name
   */
  public static label = `@bud registry start`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `registry`, `start`],
  ]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `start verdaccio registry`,
    examples: [[`start verdaccio server`, `yarn @bud registry start`]],
  }

  /**
   * Execute command
   */
  public async execute() {
    try {
      await this.cli.run([
        `@bud`,
        `pm2`,
        `start`,
        join(paths.root, `storage/node_modules/.bin/verdaccio`),
        `--`,
        `--config`,
        join(paths.root, `config/verdaccio/config.yaml`),
      ])
    } catch (e) {}
  }
}
