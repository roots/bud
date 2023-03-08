/* eslint-disable no-console */
import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'
import {TestE2E} from './test.e2e.command'
import {TestIntegration} from './test.integration.command'
import {TestUnit} from './test.unit.command'

const commands = [TestE2E, TestIntegration, TestUnit]

/**
 * Run tests
 */
export class TestRun extends Command {
  /**
   * Command name
   */
  public static label = `@bud test`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `test`]]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run tests`,
    examples: [
      [`run e2e tests`, `yarn @bud test e2e`],
      [`run unit tests`, `yarn @bud test unit`],
      [`run integration tests`, `yarn @bud test integration`],
    ],
  }

  /**
   * Execute command
   */
  public async execute() {
    process.stdout.write(`    
 _               _
| |__  _   _  __| |
|  _ \\| | | |/ _  |
| |_) | |_| | (_| |
|_.__/ \\__._|\\__._|
`)
    Object.values(commands)
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
