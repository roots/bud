import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Default jest flags
 *
 * @internal
 */
const DEFAULT_JEST_FLAGS = `--config ./config/jest.config.js`

/**
 * Run tests
 *
 * @internal
 */
export class Test extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud test`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `test`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run tests`,
    examples: [
      [`run unit tests`, `yarn @bud test unit`],
      [`run integration tests`, `yarn @bud test integration`],
    ],
  }

  /**
   * Variadic arguments
   *
   * @internal
   */
  public passthrough = Option.Proxy({name: `jest params`})

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    return await this.$(
      this.withPassthrough(
        `yarn node --experimental-vm-modules $(yarn bin jest) ${DEFAULT_JEST_FLAGS}`,
      ),
    )
  }
}
