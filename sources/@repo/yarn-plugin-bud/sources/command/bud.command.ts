import {CommandClass} from 'clipanion'

import {Commands} from './'
import {Command} from './base.command'

/**
 * `@bud` command class
 *
 * @internal
 */
export class Bud extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`]]

  /**
   * Command execute
   *
   * @internal
   */
  public async execute() {
    process.stdout.write(`    
 _               _
| |__  _   _  __| |
|  _ \\| | | |/ _  |
| |_) | |_| | (_| |
|_.__/ \\__._|\\__._|
`)
    Object.values(Commands)
      .filter(command => command.usage)
      .forEach(command => {
        command.usage.examples?.forEach(([description, example]) => {
          process.stdout.write(
            `\n\x1b[34m${example}\x1b[0m  ${description}\n`,
          )
        })
      })
  }
}
