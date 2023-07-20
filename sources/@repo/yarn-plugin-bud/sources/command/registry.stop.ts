import {CommandClass} from 'clipanion'
import {noop} from 'lodash'

import {Command} from './base.command'

/**
 * bud registry stop command class
 */
export class RegistryStop extends Command {
  public static paths: CommandClass['paths'] = [
    [`@bud`, `registry`, `stop`],
  ]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `stop verdaccio registry`,
    examples: [[`stop verdaccio server`, `yarn @bud registry stop`]],
  }

  public async execute() {
    await this.cli.run([`@bud`, `pm2`, `stop`, `verdaccio`]).catch(noop)
    await this.cli.run([`@bud`, `pm2`, `delete`, `verdaccio`]).catch(noop)
  }
}
